const verifyToken = require("../middleware/auth");
const Space = require("../modals/Space");
const router = require("express").Router();

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

router.get("/fetch-wall", async (req, res) => {
  const { spaceId } = req.query;
  try {
    const space = await Space.findOne({ _id: spaceId });
    const wall = space?.testimonials.filter((test) => test.WOF);
    res.status(200).json(wall);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
