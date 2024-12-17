import dotenv from "dotenv"

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

export const FIND_APP_TYPE_PROMPT = "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra. If you are not able to find out the project type return 'null' as string";

export const allowedHTMLElements = [
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
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

export function genAiModel(systemPrompt: string){
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
        { text: systemPrompt }
      ]
    }
  });

  return model;
}