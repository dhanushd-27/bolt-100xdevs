"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("./prompts");
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/template', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const model = (0, constants_1.genAiModel)(constants_1.FIND_APP_TYPE_PROMPT);
    const appType = yield model.generateContent(prompt);
    const type = appType.response.text().replace('\n', "");
    if (type != "react" && type != "node") {
        res.status(400).json({
            message: "Something went wrong"
        });
        return;
    }
    if (type == "react") {
        res.json({
            type,
            prompts: [prompts_1.BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [react_1.basePrompt]
        });
        return;
    }
    if (type == "node") {
        res.json({
            type,
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [node_1.basePrompt]
        });
        return;
    }
}));
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    const model = (0, constants_1.genAiModel)((0, prompts_1.getSystemPrompt)());
    let response = "";
    for (const prompt of messages) {
        const result = yield model.generateContent(prompt.content);
        response += result.response.text();
    }
    console.log(response);
    res.status(200).json({
        response: response
    });
}));
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
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
