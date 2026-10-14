import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { seedData } from "./seedHelper";

const runSeed = async () => {
  try {
    const connStr = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/tawtheeq_db";
    await mongoose.connect(connStr);
    console.log("[Seed] Connected to MongoDB");
    await seedData();
    console.log("[Seed] Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seed] Error seeding database:", error);
    process.exit(1);
  }
};

runSeed();
