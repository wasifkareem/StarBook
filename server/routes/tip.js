const Razorpay = require("razorpay");
const User = require("../modals/User");
const crypto = require("crypto");
const verifyToken = require("../middleware/auth");
const router = require("express").Router();

router.get("/order", async (req, res) => {
  const { currency, amount, label } = req.query;
  const user = await User.findOne({ email: req.query.email });
  const key = Buffer.from(process.env.KEY_PASS, "hex");
  const iv = Buffer.from(process.env.IV, "hex");

  try {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decryptedSec = decipher.update(user.keySecret, "hex", "utf8");
    decryptedSec += decipher.final("utf8");
    let instance = new Razorpay({
      key_id: user.keyId,
      key_secret: decryptedSec,
    });

    const options = {
      amount: amount * 100, // amount == Rs 10
      currency: currency,
      receipt: "receipt#1",
      payment_capture: 1,
      notes: {
        key1: label,
      },

      // 1 for automatic capture // 0 for manual capture
    };
    instance.orders.create(options, async (err, order) => {
      order.key = user.keyId;
      if (err) {
        return res.status(500).json({
          message: err,
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

router.post("/validate", async (req, res) => {
  const { email } = req.query;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const user = await User.findOne({ email });
  const key = Buffer.from(process.env.KEY_PASS, "hex");
  const iv = Buffer.from(process.env.IV, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedSec = decipher.update(user.keySecret, "hex", "utf8");
  decryptedSec += decipher.final("utf8");
  const generatedSignature = crypto
    .createHmac("sha256", decryptedSec)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  // console.log(generatedSignature, razorpay_signature);

  if (generatedSignature !== razorpay_signature) {
    res.statusCode = 400;
    throw new Error("payment is not legit!");
  }
  res.status(201).json({
    id: razorpay_payment_id,
    status: "success",
    message: "payment is successful",
    updateTime: new Date().toLocaleTimeString(),
  });
});

router.get("/fetch-payments", verifyToken, async (req, res) => {
  const { email, label } = req.query;
  const today = new Date();

  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 30);

  const pastTimestamp = pastDate.getTime();
  const key = Buffer.from(process.env.KEY_PASS, "hex");
  const iv = Buffer.from(process.env.IV, "hex");

  try {
    const options = {
      count: 100,
      from: Math.floor(pastDate.getTime() / 1000),
      to: Math.floor(today.getTime() / 1000),
    };
    const user = await User.findOne({ email });
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decryptedSec = decipher.update(user.keySecret, "hex", "utf8");
    decryptedSec += decipher.final("utf8");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.keyId || !decryptedSec) {
      return res.status(404).json("keys not found");
    }
    const instance = new Razorpay({
      key_id: user.keyId,
      key_secret: decryptedSec,
    });

    const payments = await instance.payments.all(options);

    let total = 0;
    const filteredItems = payments?.items.filter(
      (item) => item.notes.key1 == `tip_${label}`
    );
    filteredItems.map((item) => (total += item.amount));
    res.json(total);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(401).json(err);
  }
});

router.put("/delete-keys", verifyToken, async (req, res) => {
  const { email } = req.query;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        keyId: null,
        keySecret: null,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
