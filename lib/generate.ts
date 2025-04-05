import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBv8FYDVTHzaVUcI4J1lvq8UzyUXXXIlpc" });

export async function generateUsingLLM(query:string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: promptMap[query] || null,
  });
  console.log(response.text);
}

const promptMap: { [key: string]: string } = {
    "generate_quiz":""
}