import Topic from "@/models/Topic";
import { NextRequest, NextResponse } from "next/server"


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


function generateSystemPrompt(topic: any, title: any, description: any) {
    return `
You are an AI designed to generate educational content in the form of case-study-based multiple-choice questions (MCQs).

Generate a structured JSON object with the following schema:
{
    topic: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    case: { type: String, required: true }, // Create a realistic case study scenario based on the topic from authorized sources
    questions: [
        {
            question: { type: String, required: true },
            options: { type: [String], required: true },
            answer: { type: Number, required: true } // index of correct option (0-based)
        }
    ]
}

Instructions:
- Use the provided topic, title, and description.
- Dynamically generate a case study relevant to the topic.
- The case should be practical, realistic, and set in a real-world scenario.
- Create 3 to 5 MCQs that test comprehension, analysis, and decision-making based on the case.
- Each question must have exactly 4 options.
- "answer" must be the index (0 to 3) of the correct option in the "options" array.
- Do not include explanations or extra commentary — output only the JSON object.

Input:
Topic: ${topic}
Title: ${title}
Description: ${description}

Output only the JSON object.
    `.trim();
}
