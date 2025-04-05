import connectToDB from "@/database/connectToDB";
import Profile from "@/models/Profile";
import Topic from "@/models/Topic";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    await connectToDB()
    const {id} = await req.json();
    const user = await User.findById(id);
    if(!user){
        return NextResponse.json({
            error:"User Not FOund"
        })
    }
    const topic = await Topic.findOne({
        user: user._id,
        date: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
            $lt: new Date(new Date().setHours(24, 0, 0, 0))  // Start of tomorrow
        }
    })
    if (!topic) {
        const userTopics = await Topic.find({
            user:user._id
        })
        const topicList = userTopics.map(topic=>{
            return topic.title;
        })
        const topicString = topicList.toString()



        // Generate Topic Logic

        const newTopicData = {
            user:user._id,
            title: "Sample Topic Title",
            description: "This is a sample description for today's topic.",
            content: "This is the content of the sample topic.",
            createdAt: new Date(),
            updatedAt: new Date(),
            tags: ["sample", "topic", "example"]
        }

        const newTopic = await Topic.create(newTopicData);
        return new Response(JSON.stringify(newTopic), { status: 201 });
    } else {
        return new Response(JSON.stringify(topic), { status: 200 });
    }
}