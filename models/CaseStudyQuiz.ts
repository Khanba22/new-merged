import { model, models, Schema } from "mongoose";
import Topic from "./Topic";

interface CaseStudyQuiz{
    topic: Schema.Types.ObjectId;
    title: string;
    description: string;
    case:string;
    questions: {
        question: string;
        options: string[];
        answer: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

const CaseStudyQuizSchema = new Schema<CaseStudyQuiz>({
    topic: { type: Schema.Types.ObjectId, required: true, ref:Topic },
    title: { type: String, required: true },
    description: { type: String, required: true },
    case:{type:String,required:true},
    questions: [
        {
            question: { type: String, required: true },
            options: { type: [String], required: true },
            answer: { type: Number, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
});

const CaseStudyQuiz = models["CaseStudyQuiz"] || model<CaseStudyQuiz>("CaseStudyQuiz", CaseStudyQuizSchema);    
