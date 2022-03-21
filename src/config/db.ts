import mongoose from "mongoose";

// Config
import { MONGODB_URI } from "./constants";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI ?? "");

    console.log("MongoDB Connection Success 👍");
  } catch (error) {
    console.log("MongoDB Connection Failed 💥");
    process.exit(1);
  }
};
