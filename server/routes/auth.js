const User = require("../modals/User");
const bycrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const crypto = require("crypto");

router.post("/register", async (req, res) => {
  const isEmailExist = await User.findOne({ email: req.body.email });
  // console.log(isEmailExist);

  if (isEmailExist)
    return res.status(400).json("an account with this email already exist!");
  let password = req.body.password;
  const salt = await bycrypt.genSalt();
  const passwordHash = await bycrypt.hash(password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    password: passwordHash,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("User not found!");

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid Credentials!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ token, userObject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/add-keys", verifyToken, async (req, res) => {
  const { keyId, keySecret, email } = req.body;
  const key = Buffer.from(process.env.KEY_PASS, "hex");
  const iv = Buffer.from(process.env.IV, "hex");
  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedSec = cipher.update(keySecret, "utf8", "hex");
    encryptedSec += cipher.final("hex");
    let UpdatedUserInfo = await User.findOneAndUpdate(
      { email: email },
      {
        keyId,
        keySecret: encryptedSec,
      }
    );
    if (!UpdatedUserInfo) {
      res.status(400).json("space not found!");
    }
    UpdatedUserInfo = UpdatedUserInfo.toObject();
    delete UpdatedUserInfo.keyId;
    delete UpdatedUserInfo.keySecret;
    res.status(200).json(UpdatedUserInfo);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
