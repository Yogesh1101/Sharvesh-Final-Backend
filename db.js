import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function dataBaseConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URL, params);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
}
