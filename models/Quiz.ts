import { Schema,model,models } from "mongoose";

interface Quiz {
    topic: Schema.Types.ObjectId;
    title: string;
    description: string;
    questions: {
        question: string;
        options: string[];
        answer: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

const QuizSchema = new Schema<Quiz>({
    topic: { type: Schema.Types.ObjectId, ref: '', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
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

const Quiz = models["Quiz"] || model<Quiz>("Quiz", QuizSchema);
export default Quiz;