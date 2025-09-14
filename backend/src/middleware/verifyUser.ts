import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "UserId is required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ success: false, message: "User not verified" });
    }

    // Attached user to request so controllers can use it
    (req as any).user = user;
    next();
  } catch (error) {
    console.error("VerifyUser Middleware Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
