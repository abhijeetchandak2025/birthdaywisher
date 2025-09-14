import express from "express";
import { generateSong } from "../controllers/song.controller";
import { verifyUser } from "../middleware/verifyUser";

const router = express.Router();

router.post("/generate", verifyUser, generateSong);

export default router;
