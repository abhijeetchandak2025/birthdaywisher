import { Document, ObjectId } from "mongoose";

export interface SongInput {
  recipientName: string;
  recipientAge: number;
  recipientGender: "male" | "female" | "other";
  mood: string;
  genre: string;
  singerVoice: string;
  lyrics: string;
}

export interface UserInput {
  name: string;
  email: string;
  phone: string;
  isVerified?: boolean;
  otp?: string;
  songs?: SongInput[];
}

export interface UserDocument extends UserInput, Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
