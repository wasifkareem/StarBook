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
    spaceId: z.string()
});
export const updateSpaceSchema = z.object({
    spaceName: z.string(),
    imgPath: z.string().optional(),
    headerTitle: z.string(),
    message: z.string(),
    qOne: z.string(),
    qTwo: z.string(),
    qThree: z.string(),
    tipBox: z.boolean().optional()
});
export const fetchSpacesSchema = z.object({
    email: z.email(),
});
