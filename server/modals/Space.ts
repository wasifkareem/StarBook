import mongoose, { Document, Schema, Types } from "mongoose";
import type { createTestimonial } from "../src/schemas/testimonial.schema.ts";
import type { createSpace } from "../src/schemas/space.schema.ts";

export interface Testimonial extends createTestimonial,Document {}
const testimonialSchema = new Schema<Testimonial>(
  {
    imgPath: { type: String, required: true },
    starRating: { type: Number, required: false },
    testimonial: { type: String, required: true },
    name: { type: String, required: true },
    spaceId: { type: String, required: true }, 
    email: { type: String, required: false },
    WOF: { type: Boolean, default: false },
    tweet: { type: Boolean, default: false },
    xId: { type: String, default: false },
    tip: { type: Number, default: null },
    title: { type: String, default: null },
    twitterHandle: { type: String, required: false },
    entities: { type: Object, required: false },
    likes: { type: Number, required: false },
    imgMedia: { type: String, required: false },
    date: { type: String, required: false },
    poster: { type: String, required: false },
    video: { type: String, required: false }
  },
  { timestamps: true }
);
 export interface Space extends createSpace, Document{
  testimonials:Types.DocumentArray<Testimonial>,
  WOF:Types.DocumentArray<Testimonial>,
  tipBox?:boolean
 }
const itemSchema = new Schema<Space>(
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

const Space = mongoose.model("Space", itemSchema);

export default Space;
