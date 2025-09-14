import { Request, Response } from "express";
import UserModel from "../models/user.model";

/**
 * Register User
 * - Accepts: name, email, phone
 * - Creates user if not exists
 * - Sends hardcoded OTP (1234)
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body as {
      name: string;
      email: string;
      phone: string;
    };

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let user = await UserModel.findOne({ phone });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "User already registered and verified",
        });
      }

      return res.json({
        success: true,
        message: "OTP sent (1234)",
        data: { userId: user._id },
      });
    }

    user = await UserModel.create({
      name,
      email,
      phone,
      isVerified: false,
    });

    return res.json({
      success: true,
      message: "OTP sent (1234)",
      data: { userId: user._id },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error registering user" });
  }
};

/**
 * Verify OTP
 * - Hardcoded OTP = "1234"
 * - Marks user as verified
 */
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body as { userId: string; otp: string };

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "UserId and OTP are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (otp !== "1234") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: "User already verified",
        data: { userId: user._id },
      });
    }

    user.isVerified = true;
    await user.save();

    return res.json({
      success: true,
      message: "User verified successfully",
      data: { userId: user._id },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying OTP" });
  }
};
