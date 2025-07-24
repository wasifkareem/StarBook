import Space from "../modals/Space.ts";
import express from "express";
import type { Request, Response } from "express"
import { validateBody, validateQuery } from "../middleware/validate.ts";
import {type createSpace, createSpaceSchema, type fetchSpaces, fetchSpacesSchema, type spaceQuery, spaceQuerySchema, type updateSpaces, updateSpaceSchema} from "../src/schemas/space.schema.ts"

const router = express.Router();

router.post("/create-space",validateBody(createSpaceSchema), async (req:Request<{},{},createSpace,{}>, res:Response) => {
  const newSpace = new Space({
    ownerEmail: req.body.ownerEmail,
    spaceName: req.body.spaceName,
    imgPath: req.body.imgPath,
    headerTitle: req.body.headerTitle,
    message: req.body.message,
    qOne: req.body.qOne,
    qTwo: req.body.qTwo,
    qThree: req.body.qThree,
  });
  try {
    const savedSpace = await newSpace.save();
    res.status(200).json(savedSpace);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete-space",validateQuery(spaceQuerySchema), async (req:Request<{}, {}, {}, spaceQuery>, res:Response) => {
  const { spaceId } = req.query;
  try {
    const spaceStatus = await Space.findByIdAndDelete(spaceId);
    if (!spaceStatus) return res.status(400).json("Space not found!");

    res.status(200).json(spaceStatus);
  } catch (err) {
    console.error(err);
  }
});

router.put("/update-space",validateQuery(spaceQuerySchema),validateBody(updateSpaceSchema), async (req:Request<{}, {}, updateSpaces, spaceQuery>, res:Response) => {
  const { spaceId } = req.query;
  try {
    const updatedSpace = await Space.findByIdAndUpdate(spaceId, {
      spaceName: req.body.spaceName,
      imgPath: req.body.imgPath,
      headerTitle: req.body.headerTitle,
      message: req.body.message,
      qOne: req.body.qOne,
      qTwo: req.body.qTwo,
      qThree: req.body.qThree,
      tipBox: req.body.tipBox,
    });

    if (!updatedSpace) {
      return res.status(400).json("Space not found!");
    }
    res.status(200).json(updatedSpace);
  } catch (err) {
    console.error(err);
  }
});

router.get("/fetch-spaces",validateQuery(fetchSpacesSchema), async (req:Request<{}, {}, {}, fetchSpaces>, res:Response) => {
  const email = req.query.email;
  try {
    let spaces = await Space.find({ ownerEmail: email });
    res.status(200).json(spaces);
  } catch (err) {
    console.error(err);
  }
});

router.get("/fetch-space", async (req, res) => {
  const spaceId = req.query.spaceId;
  try {
    let spaces = await Space.findById({ _id: spaceId });
    res.status(200).json(spaces);
  } catch (err) {
    console.error(err);
  }
});

router.get("/fetch-reviewInfo", async (req, res) => {
  const spaceId = req.query.spaceId;
  try {
    let spaces = await Space.findById({ _id: spaceId }, "-ownerEmail");
    res.status(200).json(spaces);
  } catch (err) {
    console.error(err);
  }
});

export default router;
