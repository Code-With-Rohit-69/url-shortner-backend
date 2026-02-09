import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("Database connected: " + conn.connection.host);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in Database connection " + error.message);
    } else {
      console.log("Error in Database connection", error);
    }
    process.exit(1);
  }
};

export default connectDB;
