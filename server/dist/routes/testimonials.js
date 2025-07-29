import express, {} from "express";
import { validateBody, validateQuery } from "../middleware/validate";
import { createTestimonialSchema, deleteTestimonialSchema } from "../src/schemas/testimonial.schema";
import { spaceQuerySchema } from "../src/schemas/space.schema";
import prisma from "../prisma/db";
const router = express.Router();
router.post("/create", validateBody(createTestimonialSchema), async (req, res) => {
    const { imgPath, starRating, name, spaceId, email, WOF, testimonial, tip, title, xId, tweet, entities, likes, date, poster, video, twitterHandle, imgMedia, } = req.body;
    try {
        let mySpace = await prisma.space.findUnique({ where: { id: spaceId } });
        if (!mySpace)
            return res.status(400).json("No Space found!");
        const newTestimonial = await prisma.testimonial.create({
            data: {
                imgPath,
                starRating,
                testimonial,
                name,
                spaceId,
                email,
                WOF,
                tip,
                title,
                xId,
                tweet,
                entities,
                likes,
                date,
                poster,
                video,
                twitterHandle,
                imgMedia,
            }
        });
        res.status(200).json(newTestimonial);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
router.delete("/delete", validateQuery(deleteTestimonialSchema), async (req, res) => {
    const { spaceId, testimonialId } = req.query;
    try {
        const deletedTestimonial = await prisma.testimonial.delete({
            where: {
                id: testimonialId,
                spaceId: spaceId,
            },
        });
        res.status(200).json("Testimonail deleted successfully!");
    }
    catch (err) {
        res.status(400).json(err);
    }
});
router.get('/fetch-tweet', async (req, res) => {
    const { xId } = req.query;
    const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';
    function getToken(xId) {
        return ((Number(xId) / 1e15) * Math.PI)
            .toString(6 ** 2)
            .replace(/(0+|\.)/g, '');
    }
    try {
        const url = new URL(`${SYNDICATION_URL}/tweet-result`);
        if (typeof xId !== "string") {
            return res.status(400).json({ error: "xId is required and must be a string" });
        }
        url.searchParams.set('id', xId);
        url.searchParams.set('lang', 'en');
        url.searchParams.set('token', getToken(xId));
        const result = await fetch(url.toString());
        const isJson = result.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await result.json() : undefined;
        if (result) {
            res.status(200).json(data);
        }
    }
    catch (error) {
        console.error("Error fetching tweet:", error);
    }
});
export default router;
