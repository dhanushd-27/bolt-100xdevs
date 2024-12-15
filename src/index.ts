import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config();

async function main(){
  const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,
    generationConfig: {
      candidateCount: 1,
      stopSequences: [],
      maxOutputTokens: 1000,
      temperature: 0,
  },});

  const prompt: string = "Rank top 5 ipl teams, just give me the names";

  const result = await model.generateContentStream(prompt);
  
  for await (const data of result.stream){
    const text = data.text();
    process.stdout.write(text);
  }
}

main();
