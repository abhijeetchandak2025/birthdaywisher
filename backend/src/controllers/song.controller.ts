import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { generateBirthdaySong } from "../utils/gemini";

/**
 * Generate a Personalized Birthday Song
 * - Requires verified user
 * - Uses Gemini API utility to generate lyrics
 * - Saves song under user document
 */
export const generateSong = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      recipientName,
      recipientAge,
      recipientGender,
      mood,
      genre,
      singerVoice,
    }: {
      userId: string;
      recipientName: string;
      recipientAge: number;
      recipientGender: string;
      mood?: string;
      genre?: string;
      singerVoice?: string;
    } = req.body;

    if (!userId || !recipientName || !recipientAge || !recipientGender) {
      return res.status(400).json({
        success: false,
        message:
          "userId, recipientName, recipientAge, and recipientGender are required",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "User not verified" });
    }

    const lyrics = await generateBirthdaySong(
      recipientName,
      recipientAge,
      recipientGender,
      mood || "happy",
      genre || "pop",
      singerVoice || "default"
    );

    if (!lyrics) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate song lyrics",
      });
    }

    const newSong = {
      recipientName,
      recipientAge,
      recipientGender,
      mood: mood || "happy",
      genre: genre || "pop",
      singerVoice: singerVoice || "default",
      lyrics,
      createdAt: new Date(),
    };

    user.songs.push(newSong);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Song generated successfully",
      song: newSong,
    });
  } catch (error) {
    console.error("Generate Song Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while generating song",
    });
  }
};
