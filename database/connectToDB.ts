import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/hackbyte3";

export default async function connectToDB() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));
}
