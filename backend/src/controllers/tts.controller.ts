import { Request, Response } from "express";
const gTTS = require("gtts");

/**
 * Generate Audio from Text using gTTS (Google Translate TTS unofficial)
 * Streams directly to memory (no file saving).
 */
export const generateAudio = async (req: Request, res: Response) => {
  try {
    const { text }: { text: string } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }

    const gtts = new gTTS(text, "en");

    // Collect audio chunks in memory
    const chunks: Buffer[] = [];
    const stream = gtts.stream();

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => {
      const audioBuffer = Buffer.concat(chunks);
      const audioBase64 = audioBuffer.toString("base64");

      return res.status(200).json({ success: true, audio: audioBase64 });
    });

    stream.on("error", (err: any) => {
      console.error("gTTS Stream Error:", err);
      return res.status(500).json({ success: false, message: "TTS generation failed" });
    });
  } catch (error) {
    console.error("TTS Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error while generating TTS" });
  }
};
