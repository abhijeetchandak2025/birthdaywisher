import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/BG.jpg";
import mainImage from "../assets/Celebrations(Bg) - hashtag.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-lg">
        <img
          src={mainImage}
          alt="Cadbury Celebrations"
          className="w-64 h-auto object-contain"
        />

        <p className="text-white text-lg font-semibold">
          A unique birthday song for everyone!
        </p>

        <p className="text-white/80 text-sm">
          इस birthday, कुछ अच्छा हो जाए कुछ मीठा हो जाए
        </p>

        <div className="mt-6">
          <button
            onClick={handleGetStarted} // Add click handler
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-semibold rounded-full shadow-md text-base transition-all duration-300 transform hover:scale-105"
          >
            GET STARTED
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default Landing;
