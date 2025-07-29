import z from "zod";
export const createTestimonialSchema = z.object({
    imgPath: z.string(),
    starRating: z.number().optional(),
    testimonial: z.string(),
    name: z.string(),
    spaceId: z.string(),
    email: z.string().optional(),
    WOF: z.boolean().optional(),
    tweet: z.boolean().optional(),
    xId: z.string().optional(),
    tip: z.number().nullable().optional(),
    title: z.string().nullable().optional(),
    twitterHandle: z.string().optional(),
    entities: z.any().optional(),
    likes: z.number().optional(),
    imgMedia: z.string().optional(),
    date: z.string().optional(),
    poster: z.string().optional(),
    video: z.string().optional(),
});
export const deleteTestimonialSchema = z.object({
    spaceId: z.string(),
    testimonialId: z.string(),
});
