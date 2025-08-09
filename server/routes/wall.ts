import { validateQuery } from "../middleware/validate.js";
import express, {type Request,type Response } from "express";
import { type spaceQuery, spaceQuerySchema } from "../src/schemas/space.schema.js";
import { type updateWallQuery, updateWallQuerySchema} from "../src/schemas/wall.schema.js"
import prisma from "../prisma/db.js";
const router = express.Router();

router.get("/fetch-wall",validateQuery(spaceQuerySchema), async (req:Request<{},{},{},spaceQuery>, res:Response) => {
  const { spaceId } = req.query;
  try {
    const space = await prisma.space.findUnique({ 
      where:{id:spaceId}, 
       include:{ testimonials:{
        where: { WOF: true },
       }}
    });
    res.status(200).json(space);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-wall",validateQuery(updateWallQuerySchema), async (req:Request, res:Response) => {
  const { spaceId, testimonialId, WOF } = req.query as unknown as updateWallQuery;
  const isActiveBoolean = WOF === "true";
  try {
    const updatedTestimonial = await prisma.testimonial.update({
    where: {
      id: testimonialId
    },
    data: {
      WOF: isActiveBoolean
    }
    })

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred" });
  }
});

export default router;
