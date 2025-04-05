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