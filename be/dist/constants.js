"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedHTMLElements = exports.FIND_APP_TYPE_PROMPT = exports.MODIFICATIONS_TAG_NAME = exports.WORK_DIR = exports.WORK_DIR_NAME = void 0;
exports.genAiModel = genAiModel;
const dotenv_1 = __importDefault(require("dotenv"));
exports.WORK_DIR_NAME = 'project';
exports.WORK_DIR = `/home/${exports.WORK_DIR_NAME}`;
exports.MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
const generative_ai_1 = require("@google/generative-ai");
dotenv_1.default.config();
exports.FIND_APP_TYPE_PROMPT = "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra. If you are not able to find out the project type return 'null' as string";
exports.allowedHTMLElements = [
    'a',
    'b',
    'blockquote',
    'br',
    'code',
    'dd',
    'del',
    'details',
    'div',
    'dl',
    'dt',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'i',
    'ins',
    'kbd',
    'li',
    'ol',
    'p',
    'pre',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'source',
    'span',
    'strike',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'ul',
    'var',
];
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY);
function genAiModel(systemPrompt) {
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
                { text: systemPrompt }
            ]
        }
    });
    return model;
}
