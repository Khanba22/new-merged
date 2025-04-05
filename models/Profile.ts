import mongoose from "mongoose";

interface Profile{
    name: string;
    email: string;
    streak:string;
    level:string;
    points:string;
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
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    points:{
        type:String,
        required:true
    },
    badges:{
        type:[String],
        required:true
    },
    achievements:{
        type:[String],
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.models["Profile"] || mongoose.model<Profile>("Profile", ProfileSchema);
export default Profile;