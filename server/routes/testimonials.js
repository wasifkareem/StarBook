const verifyToken = require("../middleware/auth");
const Space = require("../modals/Space");

const router = require("express").Router();

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

module.exports = router;
