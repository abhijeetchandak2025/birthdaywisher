import React, { FC, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from "../assets/BG.jpg";
import progressImage from "../assets/progress bar4.png";
import Navbar from "../components/Navbar";

interface Song {
  lyrics: string;
  recipientName: string;
  recipientAge: number;
  recipientGender: string;
  mood: string;
  genre: string;
  singerVoice: string;
  createdAt: string;
}

const SongPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const state = location.state as { song: Song } | undefined;
  const song = state?.song;

  useEffect(() => {
    if (!song) {
      navigate("/song-selection");
    }
  }, [song, navigate]);

  useEffect(() => {
    if (!song) return;

    const generateAudio = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://birthdaywisher-f2wz.onrender.com/api/tts/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: song.lyrics }),
        });

        const data = await res.json();
        if (!data.success) {
          console.error(data.message || "Failed to generate audio");
          setIsLoading(false);
          return;
        }

        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );

        const url = URL.createObjectURL(audioBlob);
        audioRef.current = new Audio(url);
        audioRef.current.onended = () => setIsPlaying(false);

        setIsLoading(false);
      } catch (err) {
        console.error("Error generating audio:", err);
        setIsLoading(false);
      }
    };

    generateAudio();
  }, [song]);

  const handlePlaySong = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!song) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar onMenuClick={() => console.log("Menu clicked!")} />
      <div className="mt-4">
        <img src={progressImage} alt="progress" className="h-4" />
      </div>
      <h2 className="text-white text-lg font-semibold mt-6 text-center">
        Your song&apos;s lyrics are ready!
      </h2>

      <div className="w-10/12 mt-6 bg-white/95 rounded-2xl p-4 max-h-80 overflow-y-auto text-gray-900 shadow-lg">
        <p className="whitespace-pre-line text-sm leading-relaxed">{song.lyrics}</p>
      </div>

      <div className="mt-10 mb-8 w-10/12">
        <button
          onClick={handlePlaySong}
          disabled={isLoading}
          className="w-full bg-yellow-400 py-4 rounded-lg font-bold text-purple-900 text-lg shadow-md disabled:opacity-50"
        >
          {isLoading ? "Preparing..." : isPlaying ? "Pause" : "PLAY SONG"}
        </button>
      </div>
    </div>
  );
};

export default SongPage;
