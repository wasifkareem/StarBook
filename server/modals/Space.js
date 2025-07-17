const { default: mongoose } = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    imgPath: { type: String, required: false },
    testimonial: { type: String, required: false },
    name: { type: String, required: false },
    twitterHandle: { type: String, required: false },
    entities:{type:Object, required:false},
    likes:{type:String,required:false},
    imgMedia: { type: String, required: false },
    spaceId: { type: String, required: false },
    email: { type: String, required: false },
    WOF: { type: Boolean, default: false },
    tweet: { type: Boolean, default: false },
    xId: { type: String, default: false },
    title: { type: String, default: null },
    date:{type:String, required:false},
    poster:{type:String, required:false},
    video:{type:String, required:false}
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
