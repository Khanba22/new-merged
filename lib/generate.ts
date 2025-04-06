import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import mime from "mime-types";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyBv8FYDVTHzaVUcI4J1lvq8UzyUXXXIlpc");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

export async function askAgent({ template, context }) {
  const promptMap: { [key: string]: string } = {
    generate_quiz: `Task: You are generating a JSON array of 10 multiple-choice questions related to legal tax avoidance techniques.

Please repeat the prompt back as you understand it.

Specifics:
1. Use the following context to guide your questions:
${context}

2. Generate exactly 10 question objects in a JSON array.
3. Each object should follow this structure:
   {
     "question": "Which authority is responsible for collecting income tax?",
     "options": [
       { "text": "IRS", "isCorrect": true },
       { "text": "FBI", "isCorrect": false },
       { "text": "CIA", "isCorrect": false },
       { "text": "NASA", "isCorrect": false }
     ]
   }

4. Each question must cover one of the following:
   - Income shifting
   - Tax deferral strategies
   - Tax shelters
   - Deductions and exemptions
   - Real-world examples where these strategies are applied (e.g., business structure, retirement accounts, investment tools)

5. Only one option should be marked as correct per question.
6. Output pure JSON — no comments, markdown, or additional text.`,

    generate_topics: `Task: You are a JSON data generator creating educational content on tax fundamentals and legal tax evasion techniques.

Please repeat the prompt back as you understand it.

Specifics:
1. Generate an array of 3 JSON objects using the structure shown in the example below.
2. Each object represents a learning module with:
   - An id, title, an array of sections, progress (as a percentage), an icon, and a content field.
3. Sections should each pose one conceptual question related to *legal techniques of tax avoidance*, such as deductions, income shifting, tax deferral, etc.
   - Each section should be relevant and only one section per object should have "completed": true.
4. The content field must include:
   - A "paragraphs" array with multiple in-depth explanations
   - One "insight" object containing a title and message summarizing a key takeaway
5. Format: Return only pure JSON — no additional explanation or markdown formatting.

Use the following as your format reference:

{
  "id": 1,
  "title": "Tax Fundamentals",
  "sections": [
    { "id": 1, "title": "What are Taxes?", "completed": true },
    { "id": 2, "title": "Types of Taxes", "completed": true },
    { "id": 3, "title": "Tax Authorities", "completed": false }
  ],
  "progress": 66,
  "icon": "BookOpen",
  "content": {
    "paragraphs": [
      "Tax authorities are government bodies responsible for administering and enforcing tax laws. In the United States, the primary federal tax authority is the Internal Revenue Service (IRS), which collects income taxes, payroll taxes, and other federal taxes.",
      "State tax authorities, such as the Franchise Tax Board in California or the Department of Revenue in many states, handle state-level taxes. Local governments may also have their own tax authorities for property taxes and other local levies."
    ],
    "insight": {
      "title": "Key Insight",
      "message": "Understanding which tax authority governs different types of taxes is crucial for proper compliance and knowing where to direct questions or concerns about your tax obligations."
    }
  }
},`,
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(promptMap[template]);
  console.log(result.response.text());
  return JSON.parse(result.response.text());
}
