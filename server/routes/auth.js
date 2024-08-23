const User = require("../modals/User");
const bycrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const crypto = require("crypto");
const { createClerkClient } = require("@clerk/clerk-sdk-node");
require("dotenv").config();
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

router.put("/add-keys", async (req, res) => {
  const { keyId, keySecret, userId } = req.body;
  try {
    const updatedUser = await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        keyId: keyId,
        keySecret: keySecret,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
