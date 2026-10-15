import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { initAdminUser } from "./services/authService";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await initAdminUser();
  app.listen(PORT, () => {
    console.log(`[Server] Tawtheeq Institute API running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("[Server] Fatal error on startup:", err);
});
