import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateBirthdaySong = async (
  recipientName: string,
  recipientAge: number,
  recipientGender: string,
  mood: string,
  genre: string,
  singerVoice: string
): Promise<string> => {
  const prompt = `
Wish a happy birthday to ${recipientName}.  

Ensure that "Happy birthday" is mentioned at least twice in the lyrics, and it should rhyme.  
The lyrics should use simple, short, and easy to pronounce words as much as possible.  

Using the above information, please write 16 lines of ${genre} lyrics that I can dedicate to him/her for his/her birthday.  
Each line can have maximum of 8 words or 40 characters.  

Mood: ${mood}  
Singer's Voice: ${singerVoice}  
Recipient Age: ${recipientAge}  
Recipient Gender: ${recipientGender}  

The lyrics generated should be completely unique and never written before every single time and should not in any way or manner infringe on any trademarks/copyrights or any other rights of any individual or entity anywhere in the world.  

Any references or similarity to existing lyrics of any song anywhere in the world needs to be completely avoided.  
Any mention of proper nouns i.e. names or places of any manner apart from the ones mentioned above needs to be completely avoided.  

The lyrics generated should not be insensitive or should not offend any person/ place/ caste/ religion/ creed/ tribe/ country/ gender/ government/ organisation or any entity or individual in any manner whatsoever.  

Any words which might be construed directly or indirectly as cuss words or are offensive in any language should also be completely avoided.  
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate song lyrics");
  }
};
