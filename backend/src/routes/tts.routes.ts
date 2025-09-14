import { Router } from "express";
import { generateAudio } from "../controllers/tts.controller";

const router = Router();

router.post("/generate", generateAudio);

export default router;
