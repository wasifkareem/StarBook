import { validateQuery } from "../middleware/validate";
import express, {} from "express";
import { spaceQuerySchema } from "../src/schemas/space.schema";
import { updateWallQuerySchema } from "../src/schemas/wall.schema";
import prisma from "../prisma/db";
const router = express.Router();
router.get("/fetch-wall", validateQuery(spaceQuerySchema), async (req, res) => {
    const { spaceId } = req.query;
    try {
        const space = await prisma.space.findUnique({
            where: { id: spaceId },
            include: { testimonials: {
                    where: { WOF: true },
                } }
        });
        res.status(200).json(space);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
router.put("/update-wall", validateQuery(updateWallQuerySchema), async (req, res) => {
    const { spaceId, testimonialId, WOF } = req.query;
    const isActiveBoolean = WOF === "true";
    try {
        const updatedTestimonial = await prisma.testimonial.update({
            where: {
                id: testimonialId
            },
            data: {
                WOF: isActiveBoolean
            }
        });
        res.status(200).json(updatedTestimonial);
    }
    catch (error) {
        res.status(500).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred" });
    }
});
export default router;
