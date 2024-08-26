const { default: mongoose } = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    imgPath: { type: String, required: true },
    starRating: { type: Number, required: true },
    testimonial: { type: String, required: true },
    name: { type: String, required: true },
    spaceId: { type: String, required: true },
    email: { type: String, required: true },
    WOF: { type: Boolean, default: false },
    tip: { type: Number, default: null },
    title: { type: String, default: null },
  },
  { timestamps: true }
);
const itemSchema = new mongoose.Schema(
  {
    ownerEmail: { type: String, required: true },
    spaceName: { type: String, required: true },
    qOne: { type: String, required: true },
    qTwo: { type: String, required: true },
    qThree: { type: String, required: true },
    imgPath: { type: String },
    headerTitle: { type: String, required: true },
    message: { type: String, required: true },
    testimonials: [testimonialSchema],
    tipBox: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Space", itemSchema);
