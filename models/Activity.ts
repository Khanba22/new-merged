import mongoose, { Schema, Document } from 'mongoose';

interface IActivity extends Document {
    profile: string;
    type: string;
    topic: string;
    pointScored: number;
    activityDate: Date;
    quizId: string;
    flashcardId: string;
    caseStudyId: string;
    createdAt: Date;
}

const ActivitySchema: Schema = new Schema({
    profile: { type: String, required: true },
    type: { type: String, required: true },
    topic: { type: String, required: true },
    pointScored: { type: Number, required: true },
    activityDate: { type: Date, required: true },
    quizId: { type: Schema.Types.ObjectId, ref: '', required: true },
    flashcardId: { type: Schema.Types.ObjectId, ref: '', required: true },
    caseStudyId: { type: Schema.Types.ObjectId, ref: '', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);