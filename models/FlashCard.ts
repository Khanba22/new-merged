import mongoose, { Schema, Document } from 'mongoose';
import Topic from './Topic';


// Improved FlashCard interface
interface FlashCard extends Document {
    topic: Schema.Types.ObjectId;
    questions: string[]; // Renamed for clarity
    answers: string[];  // Renamed for clarity
    createdAt: Date;
    updatedAt?: Date;    // Added optional updatedAt field
}

// Mongoose schema for FlashCard
const FlashCardSchema: Schema = new Schema(
    {
        topic: { type: Schema.Types.ObjectId, required: true, ref:Topic },
        questions: { type: [String], required: true },
        answers: { type: [String], required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date },
    },
    { timestamps: true } // Automatically manages createdAt and updatedAt
);

const FlashCard = mongoose.models["FlashCard"] || mongoose.model<FlashCard>('FlashCard', FlashCardSchema);
export default FlashCard