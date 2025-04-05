function generateTriviaPrompt(topicId: any, title: any, description: any) {
    return `
You are an AI that creates trivia-style multiple-choice questions (MCQs) for educational purposes.

Generate a structured JSON object with the following schema:
{
    topic: ObjectId, // use the provided topic ID
    title: string,   // provided title
    description: string, // provided description
    questions: [
        {
            question: string,
            options: string[4], // exactly 4 options
            answer: number      // index (0–3) of the correct option
        }
    ]
}

Instructions:
- Use the provided topic ID, title, and description.
- Dynamically generate trivia content related to the topic.
- Generate 5 trivia-style multiple-choice questions based on general knowledge or interesting facts.
- Each question must have 4 distinct options.
- The "answer" field must be the index (0 to 3) of the correct answer in the options array.
- The trivia should be engaging, fact-based, and easy to understand.
- Avoid repetition or overly technical jargon.
- Output only the JSON object — no extra explanation or commentary.

Input:
Topic ID: ${topicId}
Title: ${title}
Description: ${description}
    `.trim();
}

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