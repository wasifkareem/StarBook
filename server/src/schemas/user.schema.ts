import { z } from "zod";

export const createSpaceSchema = z.object({
  ownerEmail: z.email(),
  spaceName: z.string(),
  imgPath: z.string().optional(),
  headerTitle: z.string().optional(),
  message: z.string().optional(),
  qOne: z.string().optional(),
  qTwo: z.string().optional(),
  qThree: z.string().optional(),
});

export type createSpace = z.infer<typeof createSpaceSchema>

export const deleteSpaceSchema = z.object({
    
})