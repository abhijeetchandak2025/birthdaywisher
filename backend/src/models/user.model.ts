import mongoose, { Schema, Document } from "mongoose";

export interface ISong {
  recipientName: string;
  recipientAge: number;
  recipientGender: string;
  mood: string;
  genre: string;
  singerVoice: string;
  lyrics: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  songs: ISong[]; 
}

const SongSchema = new Schema<ISong>(
  {
    recipientName: { type: String, required: true },
    recipientAge: { type: Number, required: true },
    recipientGender: { type: String, required: true },
    mood: { type: String, required: true },
    genre: { type: String, required: true },
    singerVoice: { type: String, required: true },
    lyrics: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    songs: { type: [SongSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
