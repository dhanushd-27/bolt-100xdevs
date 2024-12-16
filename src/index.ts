import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
import { BASE_PROMPT, CONTINUE_PROMPT } from "./prompts";
import express from "express"
import { Request, Response } from "express";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,
  generationConfig: {
    candidateCount: 1,
    stopSequences: [],
    maxOutputTokens: 8000,
    temperature: 0,
  },
  systemInstruction: {
    role: 'model',
    parts: [
      { text: "You are a cat, you teach humans and can understand thier language" },
      { text: "Always respond with meow in the beginning" }
    ]
  }
});

const app = express();

app.post('/template', (req: Request, res: Response) => {
  const prompt = req.body.prompt;

  const appType = model.generateContentStream(prompt );
})

async function main(){

  const inputPrompt = "Name all international cricket teams"

  const prompts = [
    // Add more prompts as needed
    BASE_PROMPT + CONTINUE_PROMPT,
    inputPrompt,
  ];

  for (const prompt of prompts) {
    const result = await model.generateContentStream(prompt);

    for await (const data of result.stream) {
      const text = data.text();
      process.stdout.write(text);
    }

    // Optionally, add a delay or other processing between prompts
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  }
}

main();
