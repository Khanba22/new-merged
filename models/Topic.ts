import { models, Schema } from "mongoose";
import { model } from "mongoose";


interface Topic {
    user:Schema.Types.ObjectId;
    title: string;
    description: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

const TopicSchema = new Schema<Topic>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
});

const Topic = models["Topic"] || model<Topic>("Topic", TopicSchema);
export default Topic