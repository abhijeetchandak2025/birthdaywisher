import { Request, Response } from "express";
import fetch from "node-fetch";

/**
 * Generate Audio from Lyrics using ElevenLabs TTS
 */
export const generateAudio = async (req: Request, res: Response) => {
  try {
    const { text }: { text: string } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: "Text is required" });
    }

    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    if (!ELEVENLABS_API_KEY) {
      return res
        .status(500)
        .json({ success: false, message: "ElevenLabs API key is missing in environment variables" });
    }

    const voiceId = "21m00Tcm4TlvDq8ikWAM";

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v1",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs TTS Error:", errText);
      return res.status(response.status).json({
        success: false,
        message: `TTS generation failed: ${errText}`,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const audioBase64 = buffer.toString("base64");

    return res.status(200).json({ success: true, audio: audioBase64 });
  } catch (error) {
    console.error("TTS Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error while generating TTS" });
  }
};
