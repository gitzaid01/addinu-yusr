import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const connStr = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/tawtheeq_db";
  try {
    await mongoose.connect(connStr);
    console.log(`[Database] Connected to MongoDB Atlas / Instance: ${mongoose.connection.host}`);
  } catch (error: any) {
    console.error(`[Database] Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
