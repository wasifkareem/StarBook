import { z } from "zod";

export const createSpaceSchema = z.object({
  ownerEmail: z.email(),
  spaceName: z.string(),
  imgPath: z.string(),
  headerTitle: z.string(),
  message: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
});

export const spaceQuerySchema = z.object({
  spaceId: z.string(),
});

export const updateSpaceSchema = z.object({
  spaceName: z.string(),
  imgPath: z.string().optional(),
  headerTitle: z.string(),
  message: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  tipBox: z.boolean().optional(),
});

export const fetchSpacesSchema = z.object({
  email: z.email(),
});

export const testimonialSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  imgPath: z.string(),
  starRating: z.number().optional(),
  testimonial: z.string(),
  name: z.string(),
  email: z.string().optional(),
  WOF: z.boolean(),
  tweet: z.boolean(),
  xId: z.string().optional(),
  tip: z.number().optional(),
  title: z.string().optional(),
  twitterHandle: z.string().optional(),
  entities: z.any().optional(),
  likes: z.number().optional(),
  imgMedia: z.string().optional(),
  date: z.string(),
  poster: z.string().optional(),
  video: z.string().optional(),
  spaceId: z.string(),
});

export const spaceInfoSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.string(),
  ownerEmail: z.email(),
  spaceName: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  imgPath: z.string().optional().nullable(),
  headerTitle: z.string(),
  message: z.string(),
  tipBox: z.boolean().optional().nullable(),
  testimonials: z.array(testimonialSchema),
});

export type SpaceInfo = z.infer<typeof spaceInfoSchema>;

export type fetchSpaces = z.infer<typeof fetchSpacesSchema>;
export type updateSpaces = z.infer<typeof updateSpaceSchema>;
export type spaceQuery = z.infer<typeof spaceQuerySchema>;
export type createSpace = z.infer<typeof createSpaceSchema>;
