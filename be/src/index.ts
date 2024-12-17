import { BASE_PROMPT, CONTINUE_PROMPT, getSystemPrompt } from "./prompts";
import express from "express"
import { Request, Response } from "express";
import { FIND_APP_TYPE_PROMPT, genAiModel } from "./constants";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());

app.post('/template', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const model = genAiModel(FIND_APP_TYPE_PROMPT);
  const appType = await model.generateContent(prompt);

  const type = appType.response.text().replace('\n', "");

  if(type != "react" && type != "node"){
    res.status(400).json({
      message: "Something went wrong"
    })
    return;
  }

  if(type == "react"){
    res.json({
      type,
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactBasePrompt]
    })
    return;
  }

  if(type == "node"){
    res.json({
      type,
      prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodeBasePrompt]
    })
    return;
  }
})

app.post('/chat', async (req: Request, res: Response) => {
  const messages = req.body.messages;

  const model = genAiModel(getSystemPrompt())

  let response = "";
  for (const prompt of messages) {
    const result = await model.generateContent(prompt.content);

    response += result.response.text();
  }

  console.log(response);

  res.status(200).json({
    response: response
  })
})

app.listen(3000, () => {
  console.log("Server listening on port 3000")
})

// async function main(){

//   const inputPrompt = "Name all international cricket teams"

//   const prompts = [
//     // Add more prompts as needed
//     "Who is ms dhoni",
//     inputPrompt,
//   ];

//   const model = genAiModel("You are expert in international cricket")

//   for (const prompt of prompts) {
//     const result = await model.generateContentStream(prompt);

//     for await (const data of result.stream) {
//       const text = data.text();
//       process.stdout.write(text);
//     }

//     // Optionally, add a delay or other processing between prompts
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
//   }
// }

// main();
