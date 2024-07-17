const { default: mongoose } = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", itemSchema);
