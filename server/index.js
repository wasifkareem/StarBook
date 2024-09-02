// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./modals/User");
const authRoute = require("./routes/auth");
const spaceRoute = require("./routes/space");
const testimonialRoute = require("./routes/testimonials");
const wallRoute = require("./routes/wall");
const tipRoute = require("./routes/tip");
const twitterRoute = require("./routes/twitter");
const app = express();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const Multer = require("multer");

const port = 3000;

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(cors());

//IMAGE HANDLING
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
app.use("/api/auth", authRoute);
app.use("/api/space", spaceRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/wall", wallRoute);
app.use("/api/tip", tipRoute);
app.use("/api/twitter", twitterRoute);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
