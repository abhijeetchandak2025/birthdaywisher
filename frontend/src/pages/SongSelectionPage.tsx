import React, { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bgImage from "../assets/BG.jpg";
import progressImage from "../assets/progress bar2.png";
import giftImage from "../assets/Purple Music Tone.png";
import partyHatImage from "../assets/Headphone.png";
import balloonImage from "../assets/Balloon2.png";
import Navbar from "../components/Navbar";
import CategorySelector from "../components/CategorySelector";

interface LocationState {
  userId?: string;
  recipientName?: string;
  recipientAge?: number;
  recipientGender?: string;
}

const SongSelectionPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, recipientName, recipientAge, recipientGender } =
    (location.state || {}) as LocationState;

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSinger, setSelectedSinger] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !recipientName || !recipientAge || !recipientGender) {
      toast.error("Missing user info. Please fill the birthday form first.");
      navigate("/birthday-details");
    }
  }, [userId, recipientName, recipientAge, recipientGender, navigate]);

  const moods = [
    { label: "Happy", icon: "😊" },
    { label: "Romantic", icon: "😘" },
    { label: "Funny", icon: "🤠" },
    { label: "Motivational", icon: "🌟" },
    { label: "Calm", icon: "😌" },
  ];

  const genres = [
    { label: "Rap", icon: "📻" },
    { label: "Rock", icon: "🎸" },
    { label: "Pop", icon: "🎤" },
    { label: "Desi", icon: "🎻" },
    { label: "EDM", icon: "🥁" },
  ];

  const singers = [
    { label: "Male Voice", icon: "🧑‍🎤" },
    { label: "Female Voice", icon: "👩‍🎤" },
  ];

  const handleProceed = async () => {
    if (!selectedMood || !selectedGenre || !selectedSinger) {
      toast.error("Please select Mood, Genre, and Singer's Voice");
      return;
    }

    const payload = {
      userId,
      recipientName,
      recipientAge,
      recipientGender,
      mood: selectedMood.toLowerCase(),
      genre: selectedGenre.toLowerCase(),
      singerVoice: selectedSinger.replace(" Voice", ""),
    };

    try {
      setLoading(true);
      const res = await fetch("https://birthdaywisher-f2wz.onrender.com/api/songs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        toast.success("Song generated successfully!");
        navigate("/song", { state: { song: data.song } });
      } else {
        toast.error(data.error || "Failed to generate song.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Navbar onMenuClick={() => console.log("Menu clicked!")} />

      <div className="mt-4 flex justify-center">
        <img src={progressImage} alt="progress" className="h-4" />
      </div>

      <h2 className="text-white text-xl font-semibold mt-6 text-center">
        What would you like their song&apos;s vibe to be?
      </h2>

      <div className="flex justify-center items-end gap-4 mt-6">
        <img src={giftImage} alt="gift" className="h-12 w-12 self-end" />
        <img src={partyHatImage} alt="partyhat" className="h-28 w-auto" />
        <img
          src={balloonImage}
          alt="balloon"
          className="h-16 w-auto self-center"
        />
      </div>

      <div className="min-h-screen flex flex-col gap-8 p-6">
        <CategorySelector
          title="Mood"
          options={moods}
          selected={selectedMood}
          onSelect={(val) => setSelectedMood(val)}
        />
        <CategorySelector
          title="Genre"
          options={genres}
          selected={selectedGenre}
          onSelect={(val) => setSelectedGenre(val)}
        />
        <CategorySelector
          title="Singer's Voice"
          options={singers}
          selected={selectedSinger}
          onSelect={(val) => setSelectedSinger(val)}
        />

        <div className="w-full flex justify-center mb-8">
          <button
            onClick={handleProceed}
            disabled={loading}
            className="bg-yellow-400 px-12 py-3 rounded-lg font-semibold text-purple-900 shadow-md disabled:opacity-50"
          >
            {loading ? "Generating..." : "Proceed"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongSelectionPage;
