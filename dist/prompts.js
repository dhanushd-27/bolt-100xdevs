"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTINUE_PROMPT = exports.getSystemPrompt = exports.BASE_PROMPT = void 0;
const constants_1 = require("./constants");
const stripIndent_1 = require("./stripIndent");
exports.BASE_PROMPT = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n";
const getSystemPrompt = (cwd = constants_1.WORK_DIR) => `
`;
exports.getSystemPrompt = getSystemPrompt;
exports.CONTINUE_PROMPT = (0, stripIndent_1.stripIndents) `
  Continue your prior response. IMPORTANT: Immediately begin from where you left off without any interruptions.
  Do not repeat any content, including artifact and action tags.
`;
