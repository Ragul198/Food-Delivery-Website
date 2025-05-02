import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    const dbUri = process.env.MONGODB_URI;
    
    await mongoose.connect(dbUri).then(() => console.log("Database connected"))
}