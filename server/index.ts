// index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import spaceRoute from "./routes/space.ts";
import testimonialRoute from "./routes/testimonials.ts";
import wallRoute from "./routes/wall.ts";
import tipRoute from "./routes/tip.js";
import insightsRoute from "./routes/ai_insights.ts";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import Multer from "multer";


const app = express();
const port = process.env.PORT||3000;

app.use(express.json());

app.use(cors());

//IMAGE HANDLING
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file:string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/upload", upload.single("my_file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});
app.use("/api/space", spaceRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/wall", wallRoute);
// app.use("/api/tip", tipRoute);
app.use("/api/AI", insightsRoute);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
