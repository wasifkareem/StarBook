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


export const spaceQuerySchema = z.object({
spaceId:z.string()
})

export const updateSpaceSchema = z.object({
  spaceName: z.string(),
  imgPath: z.string().optional(),
  headerTitle: z.string(),
  message: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  tipBox: z.string().optional()
})

export const fetchSpacesSchema = z.object({
  email:z.email(),
})

export type fetchSpaces = z.infer<typeof fetchSpacesSchema>
export type updateSpaces = z.infer<typeof updateSpaceSchema>
export type spaceQuery  =z.infer<typeof spaceQuerySchema>
export type createSpace = z.infer<typeof createSpaceSchema>