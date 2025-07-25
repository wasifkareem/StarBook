import { validateQuery } from "../middleware/validate.ts";
import Space from "../modals/Space.ts";
import express, {type Request,type Response } from "express";
import { type spaceQuery, spaceQuerySchema } from "../src/schemas/space.schema.ts";
import { updateWallQuerySchema} from "../src/schemas/wall.schema.ts"
const router = express.Router();

router.get("/fetch-wall",validateQuery(spaceQuerySchema), async (req:Request<{},{},{},spaceQuery>, res:Response) => {
  const { spaceId } = req.query;
  try {
    const space = await Space.findOne({ _id: spaceId });
    const wall = space?.WOF;
    res.status(200).json(wall);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-wall",validateQuery(updateWallQuerySchema), async (req:Request, res:Response) => {
  const { spaceId, testimonialId, WOF } = req.query;
  const isActiveBoolean = WOF === "true";
  try {
    const UpdatedSpace = await Space.findOneAndUpdate(
      { _id: spaceId, "testimonials._id": testimonialId },
      { $set: { "testimonials.$.WOF": isActiveBoolean } },
      { new: true }
    );

    if (isActiveBoolean) {
      await Space.updateOne(
        { _id: spaceId },
        {
          $push: {
            WOF: UpdatedSpace?.testimonials.find(
              (t) => (t as {_id:string})._id.toString() === testimonialId
            ),
          },
        }
      );
    } else {
      await Space.updateOne(
        { _id: spaceId },
        { $pull: { WOF: { _id: testimonialId } } }
      );
    }

    // Get the final updated Space document after the WOF update
    const FinalUpdatedSpace = await Space.findById(spaceId);
    res.status(200).json(FinalUpdatedSpace);
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred" });
  }
});

export default router;
