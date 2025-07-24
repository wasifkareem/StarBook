import Space from "../modals/Space.js";
import express, {type Request,type Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { validateQuery } from "../middleware/validate.js";
import { type spaceQuery, spaceQuerySchema } from "../src/schemas/space.schema.js";
const router = express.Router();


router.post("/get-insights",validateQuery(spaceQuerySchema), async (req:Request<{},{},{},spaceQuery>, res:Response) => {
  const { spaceId } = req.query;
  if (!process.env.GOOGLE_API_KEY) {
    console.error("Gemini API key is missing. Unable to generate insights.");
    throw new Error("Gemini API key is missing");
  }
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  try {
    const spaceData = await Space.findById({ _id: spaceId });
    const testi_arr = spaceData?.testimonials.map((obj) => ({
      testimonial: obj.testimonial,
    }));
    if (testi_arr?.length === 0) {
      res.status(400).json("No testimonials found, can't generate Insights");
      return;
    }
    const prompt = `Analyse the testimonial in this array : ${JSON.stringify(
      testi_arr
    )}.these testimonials are from sass product users/customers, return a parsed JSON object, containg  key-value pair, first key will be"positive" with value being an three line paragraph of things users love about this product, second key will be "negative" with value being a three line paragraph of problem users are facing during using the product, third key will be "suggestions"with value being an object with three keys(named "one","two","three") having value as three bullet points of suggestions with initial bold text on what can be improved based on all the testimonials, dont add any markdown or language identifier, just raw JSON, content should not exceed 1380 characters, `;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text
      .replace(/```json\n/, "")
      .replace(/\n``` \n/, "")
      .trim();

    text = JSON.parse(text);

    console.log(testi_arr);
    res.status(200).json(text);
  } catch (err) {
    console.error(err);
  }
});

export default router;
