import z from "zod";

export const tweetSchema = z.object({
  xId: z.string().optional(),
  imgPath: z.string(),
  imgMedia: z.string().optional(),
  spaceId: z.string(),
  WOF: z.boolean().optional(),
  name: z.string(),
  testimonial: z.string(),
  isAdmin: z.boolean().optional(),
  twitterHandle: z.string().optional(),
  poster: z.string().optional(),
  video: z.string().optional(),
  entities: z.any().optional(),
  likes: z.number().optional(),
  date: z.string(),
});
export const TestimonialSchema = z.object({
  starRating: z.number().optional(),
  email: z.string().optional(),
  tip: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  tweet: z.boolean().optional(),
  id:z.string().optional()
});

export const createTestimonialSchema = tweetSchema.extend(
  TestimonialSchema.shape
);

export const deleteTestimonialSchema  = z.object({
    spaceId:z.string(),
    testimonialId:z.string(),
})


export type deleteTestimonail = z.infer<typeof deleteTestimonialSchema>
export type Testimonial = z.infer< typeof createTestimonialSchema>