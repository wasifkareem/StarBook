import z from "zod";
import { deleteTestimonialSchema } from "./testimonial.schema.js";
export const updateWallQuerySchema = deleteTestimonialSchema.extend({
    WOF: z.boolean()
});
