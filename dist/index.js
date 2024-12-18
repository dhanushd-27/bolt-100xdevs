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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const prompts_1 = require("./prompts");
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
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
const app = (0, express_1.default)();
app.post('/template', (req, res) => {
    const prompt = req.body.prompt;
    const appType = model.generateContentStream(prompt);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const inputPrompt = "Name all international cricket teams";
        const prompts = [
            // Add more prompts as needed
            prompts_1.BASE_PROMPT + prompts_1.CONTINUE_PROMPT,
            inputPrompt,
        ];
        for (const prompt of prompts) {
            const result = yield model.generateContentStream(prompt);
            try {
                for (var _d = true, _e = (e_1 = void 0, __asyncValues(result.stream)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const data = _c;
                    const text = data.text();
                    process.stdout.write(text);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Optionally, add a delay or other processing between prompts
            yield new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        }
    });
}
main();
