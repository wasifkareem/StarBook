import User from "../modals/User.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";
import crypto from "crypto";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

router.post("/register", async (req, res) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist)
    return res.status(400).json("an account with this email already exist!");
  let password = req.body.password;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
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

    const isMatch = await bcrypt.compare(password, user.password);
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
    res.status(200).json(updatedUser?.privateMetadata);
  } catch (err) {
    console.error(err);
  }
});

router.get("get-keyId", async (req, res) => {
  const { userId } = req.query;
  const user = await clerkClient.users.getUser(userId);

  if (!user.privateMetadata) {
    res.status(200).json(null);
  }
  res.status(200).json(user?.privateMetadata);
});

export default router;
