import express from "express";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/app", async (req, res) => {
  console.log(req.body);
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question",
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: question,
    });

    return res.status(200).json({
      success: true,
      question,
      answer: result.text,
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate an answer",
    });
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
