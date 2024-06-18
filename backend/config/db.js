import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin:90PE5bfjEryoIUOX@cluster0.zvszq2r.mongodb.net/").then(() =>
    console.log("Connected to MongoDB"));
}