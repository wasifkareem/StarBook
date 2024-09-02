const { default: mongoose } = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    imgPath: { type: String, required: false },
    starRating: { type: Number, required: false },
    testimonial: { type: String, required: false },
    name: { type: String, required: false },
    spaceId: { type: String, required: false },
    email: { type: String, required: false },
    WOF: { type: Boolean, default: false },
    tweet: { type: Boolean, default: false },
    xId: { type: String, default: false },
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
    WOF: [testimonialSchema],
    tipBox: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Space", itemSchema);
