const verifyToken = require("../middleware/auth");
const Space = require("../modals/Space");

const router = require("express").Router();

router.post("/create", async (req, res) => {
  const { imgPath, starRating, name, spaceId, email, WOF, testimonial } =
    req.body;
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
    });
    const updatedSpace = await mySpace.save();
    res.status(200).json(updatedSpace);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/fetch-all", verifyToken, async (req, res) => {
  const { spaceId } = req.query;
  try {
    const mySpace = await Space.findById(spaceId);
    if (!mySpace) return res.status(400).json("Space not found!");

    res.status(200).json(mySpace?.testimonials);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update-wall", verifyToken, async (req, res) => {
  const { spaceId, testimonialId, WOF } = req.query;
  const isActiveBoolean = WOF === "true";
  try {
    const UpdatedTestimonial = await Space.findOneAndUpdate(
      { _id: spaceId, "testimonials._id": testimonialId },
      { $set: { "testimonials.$.WOF": isActiveBoolean } },
      { new: true }
    );

    res.status(200).json(UpdatedTestimonial);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
