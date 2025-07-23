import express from "express";
import verifyToken from "../middleware/auth.js";
import Space from "../modals/Space.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const {
    imgPath,
    starRating,
    name,
    spaceId,
    email,
    WOF,
    testimonial,
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
  } = req.body;
  try {
    let mySpace = await Space.findById({ _id: spaceId });
    if (!mySpace) return res.status(400).json("No Space found!");
    mySpace.testimonials.push({
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
    });
    const updatedSpace = await mySpace.save();
    res.status(200).json(updatedSpace);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/fetch-all", async (req, res) => {
  const { spaceId } = req.query;
  try {
    const mySpace = await Space.findById(spaceId);
    if (!mySpace) return res.status(400).json("Space not found!");

    res.status(200).json((mySpace?.testimonials).reverse());
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete", async (req, res) => {
  const { spaceId, testimonialId } = req.query;
  try {
    const deleteTestimonial = await Space.updateOne(
      { _id: spaceId },
      {
        $pull: {
          testimonials: { _id: testimonialId },
          WOF: { _id: testimonialId },
        },
      }
    );
    if (deleteTestimonial.modifiedCount === 1) {
      res.status(200).json("testimonial deleted successfully");
    }
  } catch (err) {
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

    url.searchParams.set('id', xId);
    url.searchParams.set('lang', 'en');
    url.searchParams.set('token', getToken(xId));

    const result = await fetch(url.toString());
    const isJson = result.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await result.json() : undefined;
    if (result) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching tweet:", error);
  }
});

export default router;
