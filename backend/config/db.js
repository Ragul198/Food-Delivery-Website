import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://foodapp:93633@cluster0.wo1ohpp.mongodb.net/foodapp').then(() => console.log("Database connected"))
}