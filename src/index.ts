import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
import { BASE_PROMPT, CONTINUE_PROMPT } from "./prompts";

dotenv.config();

async function main(){
  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,
    generationConfig: {
      candidateCount: 1,
      stopSequences: [],
      maxOutputTokens: 8000,
      temperature: 0,
  },});

  const inputPrompt = "Build a simple todo app using react"

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
