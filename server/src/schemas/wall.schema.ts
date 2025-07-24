import z from "zod";
import { deleteTestimonialSchema } from "./testimonial.schema";

export const updateWallQuerySchema = deleteTestimonialSchema.extend({
WOF: z.boolean()
})

export type updateWallQuery = z.infer<typeof updateWallQuerySchema>