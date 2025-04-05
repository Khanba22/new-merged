import Topic from "@/models/Topic";
import { NextRequest, NextResponse } from "next/server"
import { title } from "node:process";


export const POST = async(req:NextRequest)=>{
    const {id} = await req.json();
    const data =await generateCaseStudy(id)
    return NextResponse.json(data);
}



const generateCaseStudy = async(topicId:string)=>{
    const topic = await Topic.findById(topicId)

    return {
        topic:topic._id,
        title:"",
        description: "This is a sample case study description.",
        case: "This is a sample case study content.",
        questions: [
            {
            question: "What is the main idea of this case study?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            answer: 0,
            },
            {
            question: "Which option best describes the case study?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: 1,
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["sample", "case study", "example"],
    }
}

function generateSystemPrompt(topic: any, description: any) {   //flashcard generation
    return `
You are an AI designed to generate educational flashcards from a given topic and paragraph.

Generate a structured JSON object with the following schema:
{
    topic: { type: String, required: true, trim: true },
    questions: { type: [String], required: true }, // important terms or keywords extracted from the description
    answers: { type: [String], required: true }, // simplified definitions of the keywords
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date } // optional, include if applicable
}

Instructions:
- Use the provided topic and description.
- Analyze the description to extract 5 to 7 important or main words (typically nouns or key terms).
- These terms will form the "questions" array – each term is a flashcard.
- For each term, generate a simplified, beginner-friendly definition in the "answers" array.
- Make sure definitions are easy to understand and focused on explaining the concept in a clear and concise way.
- Do not include examples, explanations, or any extra commentary — only return the JSON object.
- Ensure "createdAt" is set to the current date and "updatedAt" is optional.

Input:
Topic: ${topic}
Description: ${description}

Output only the JSON object.
    `.trim();
}