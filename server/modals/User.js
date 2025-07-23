import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    keyId: { type: String, default: null },
    keySecret: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", itemSchema);
