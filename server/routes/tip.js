import Razorpay from "razorpay";
import User from "../modals/User.js";
import crypto from "crypto";
import verifyToken from "../middleware/auth.js";
import express from "express";
import { createClerkClient } from "@clerk/clerk-sdk-node";

const router = express.Router();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

router.get("/order", async (req, res) => {
  const { currency, amount, label, userId } = req.query;

  const user = await clerkClient.users.getUser(userId);

  if (!user.privateMetadata) {
    return res.status(200).json("Keys not found!");
  }

  try {
    let instance = new Razorpay({
      key_id: user?.privateMetadata?.keyId,
      key_secret: user?.privateMetadata?.keySecret,
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
      order.key = user?.keyId;
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
  const { userId } = req.query;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const user = await clerkClient.users.getUser(userId);

  if (!user.privateMetadata) {
    return res.status(200).json("Keys not found!");
  }

  const generatedSignature = crypto
    .createHmac("sha256", user?.privateMetadata?.keySecret)
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

router.get("/fetch-payments", async (req, res) => {
  const { userId, label } = req.query;
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 30);

  try {
    const options = {
      count: 100,
      from: Math.floor(pastDate.getTime() / 1000),
      to: Math.floor(today.getTime() / 1000),
    };
    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata) {
      return res.status(200).json("Keys not found!");
    }
    const instance = new Razorpay({
      key_id: user.privateMetadata?.keyId,
      key_secret: user.privateMetadata?.keySecret,
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

router.put("/delete-keys", async (req, res) => {
  const { userId } = req.query;
  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        keyId: null,
        keySecret: null,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
