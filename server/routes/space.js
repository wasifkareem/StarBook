const Space = require("../modals/Space");
const verifyToken = require("../middleware/auth");
const bycrypt = require("bcrypt");

const router = require("express").Router();

router.post("/create-space", verifyToken, async (req, res) => {
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

router.delete("/delete-space", verifyToken, async (req, res) => {
  const { spaceId } = req.query;
  try {
    const spaceStatus = await Space.findByIdAndDelete(spaceId);
    if (!res) return res.status(400).json("Space not found!");

    res.status(200).json(spaceStatus);
  } catch (err) {
    console.error(err);
  }
});
router.put("/update-space", verifyToken, async (req, res) => {
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
    });

    if (!updatedSpace) {
      res.status(400).json("Space not found!");
    }
    res.status(200).json(updatedSpace);
  } catch (err) {
    console.error(err);
  }
});

router.get("/fetch-spaces", verifyToken, async (req, res) => {
  const email = req.query.email;
  try {
    let spaces = await Space.find({ ownerEmail: email });
    res.status(200).json(spaces);
  } catch (err) {
    console.error(err);
  }
});
router.get("/fetch-space", verifyToken, async (req, res) => {
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

module.exports = router;
