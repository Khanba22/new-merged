import mongoose from "mongoose";

interface Profile{
    name: string;
    email: string;
    streak:number;
    level:number;
    points:number;
    badges:string[];
    achievements:string[];
    createdAt: Date;
}

const ProfileSchema = new mongoose.Schema<Profile>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    streak:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    badges:{
        type:[String],
        required:true
    },
    achievements:{
        type:[],
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.models["Profile"] || mongoose.model<Profile>("Profile", ProfileSchema);
export default Profile;