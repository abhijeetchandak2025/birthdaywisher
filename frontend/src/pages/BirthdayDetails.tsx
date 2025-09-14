import React, { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bgImage from "../assets/BG.jpg";
import progressImage from "../assets/progress bar1.png";
import giftImage from "../assets/Asset 1.png";
import partyHatImage from "../assets/Cap&Gift.png";
import balloonImage from "../assets/Balloon.png";
import noteImage from "../assets/Purple tone.png";
import Navbar from "../components/Navbar";

interface LocationState {
  userId?: string;
}

const BirthdayDetails: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = (location.state || {}) as LocationState;

  const [recipientName, setRecipientName] = useState("");
  const [recipientAge, setRecipientAge] = useState<number>(1);
  const [recipientGender, setRecipientGender] = useState("Male");

  useEffect(() => {
    if (!userId) {
      toast.error("User not found. Please register first.");
      navigate("/");
    }
  }, [userId, navigate]);

  const handleProceed = () => {
    if (!recipientName.trim()) {
      toast.error("Please enter the recipient's name");
      return;
    }

    navigate("/song-selection", {
      state: {
        userId,
        recipientName,
        recipientAge,
        recipientGender,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* ToastContainer */}
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

      <div className="mt-4">
        <img src={progressImage} alt="progress" className="h-4" />
      </div>

      <h2 className="text-white text-xl font-semibold mt-6 text-center">
        Tell us about your loved one...
      </h2>

      <div className="flex justify-center gap-6 mt-6">
        <img src={giftImage} alt="gift" className="h-24 w-auto" />
        <img src={partyHatImage} alt="partyhat" className="h-24 w-auto" />
        <img src={balloonImage} alt="balloon" className="h-24 w-auto" />
      </div>

      <div className="w-full mt-8 flex flex-col gap-6 items-center">
        <div className="w-8/12 max-w-sm text-center">
          <label className="text-white block mb-2">Their name</label>
          <input
            type="text"
            placeholder="Enter Their Name"
            className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-900"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <div className="w-8/12 max-w-sm text-center">
          <label className="text-white block mb-2">
            How old they'll be this birthday
          </label>
          <select
            className="w-full px-4 py-3 rounded-lg text-gray-900"
            value={recipientAge}
            onChange={(e) => setRecipientAge(Number(e.target.value))}
          >
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} Years
              </option>
            ))}
          </select>
        </div>

        <div className="w-8/12 max-w-sm text-center">
          <label className="text-white block mb-2">Gender</label>
          <select
            className="w-full px-4 py-3 rounded-lg text-gray-900"
            value={recipientGender}
            onChange={(e) => setRecipientGender(e.target.value)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="relative w-full flex justify-center mt-12 mb-8">
        <img
          src={noteImage}
          alt="note"
          className="absolute left-10 bottom-0 h-10 w-auto"
        />

        <button
          className="bg-yellow-400 px-12 py-3 rounded-lg font-semibold text-purple-900"
          onClick={handleProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BirthdayDetails;
