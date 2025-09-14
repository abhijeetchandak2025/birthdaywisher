import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import songRoutes from "./routes/song.route";
import ttsRoutes from "./routes/tts.routes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/tts", ttsRoutes);

export default app;
