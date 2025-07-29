import prisma from "../prisma/db";
import express from "express";
import { validateBody, validateQuery } from "../middleware/validate";
import { createSpaceSchema, fetchSpacesSchema, spaceQuerySchema, updateSpaceSchema } from "../src/schemas/space.schema";
const router = express.Router();
router.post("/create-space", validateBody(createSpaceSchema), async (req, res) => {
    try {
        const newSpace = await prisma.space.create({
            data: {
                ownerEmail: req.body.ownerEmail,
                spaceName: req.body.spaceName,
                imgPath: req.body.imgPath,
                headerTitle: req.body.headerTitle,
                message: req.body.message,
                qOne: req.body.qOne,
                qTwo: req.body.qTwo,
                qThree: req.body.qThree,
            }
        });
        res.status(200).json(newSpace);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not create space." });
    }
});
router.delete("/delete-space", validateQuery(spaceQuerySchema), async (req, res) => {
    const { spaceId } = req.query;
    try {
        const spaceStatus = await prisma.space.delete({
            where: { id: spaceId }
        });
        res.status(200).json(spaceStatus);
    }
    catch (err) {
        // Prisma throws an error if the record to delete is not found
        console.error(err);
        res.status(400).json("Space not found or could not be deleted.");
    }
});
router.put("/update-space", validateQuery(spaceQuerySchema), validateBody(updateSpaceSchema), async (req, res) => {
    const { spaceId } = req.query;
    try {
        const updatedSpace = await prisma.space.update({
            where: { id: spaceId },
            data: {
                spaceName: req.body.spaceName,
                imgPath: req.body.imgPath,
                headerTitle: req.body.headerTitle,
                message: req.body.message,
                qOne: req.body.qOne,
                qTwo: req.body.qTwo,
                qThree: req.body.qThree,
                tipBox: req.body.tipBox,
            }
        });
        res.status(200).json(updatedSpace);
    }
    catch (err) {
        console.error(err);
        res.status(400).json("Space not found or could not be updated.");
    }
});
router.get("/fetch-spaces", validateQuery(fetchSpacesSchema), async (req, res) => {
    const email = req.query.email;
    try {
        let spaces = await prisma.space.findMany({
            where: { ownerEmail: email },
            // To include testimonials, you can use 'include'
            // include: { testimonials: true } 
        });
        res.status(200).json(spaces);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch spaces." });
    }
});
router.get("/fetch-space", async (req, res) => {
    const spaceId = req.query.spaceId;
    try {
        let space = await prisma.space.findUnique({
            where: { id: spaceId },
            // Include related testimonials in the response
            include: { testimonials: true }
        });
        res.status(200).json(space);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch space." });
    }
});
router.get("/fetch-reviewInfo", async (req, res) => {
    const spaceId = req.query.spaceId;
    try {
        let space = await prisma.space.findUnique({
            where: { id: spaceId },
            // Select only the fields you want to return
            select: {
                spaceName: true,
                qOne: true,
                qTwo: true,
                qThree: true,
                imgPath: true,
                headerTitle: true,
                message: true,
                tipBox: true,
                id: true
            }
        });
        res.status(200).json(space);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch review info." });
    }
});
export default router;
