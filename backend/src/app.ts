import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import songRoutes from "./routes/song.route";
import ttsRoutes from "./routes/tts.routes";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/tts", ttsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

export default app;
