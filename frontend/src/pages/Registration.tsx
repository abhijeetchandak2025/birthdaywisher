import React, { useState } from "react";
import bgImage from "../assets/BG.jpg";
import mainImage from "../assets/Celebrations(Bg).png";
import progressImage from "../assets/progress bar.png";
import Navbar from "../components/Navbar";
import OtpPopup from "../components/OtpPopup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    userId?: string;
  };
}

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [promotions, setPromotions] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [otpError, setOtpError] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];

    // Validations
    if (!phone.trim()) validationErrors.push("Phone number is required.");
    if (!fullName.trim()) validationErrors.push("Full name is required.");
    if (!email.trim()) validationErrors.push("Email ID is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email))
      validationErrors.push("Enter a valid email ID.");
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phone))
      validationErrors.push("Enter a valid 10-digit phone number.");
    if (!acceptTerms)
      validationErrors.push("You must accept Terms & Conditions.");
    if (!promotions) validationErrors.push("You must opt-in for promotions.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach((err) => toast.error(err));
      return;
    }

    setErrors([]);
    setLoading(true);

    try {
      const res = await fetch("https://birthdaywisher-vopu.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, phone }),
      });

      const data: ApiResponse = await res.json();
      setLoading(false);

      if (res.ok && data.success && data.data?.userId) {
        setUserId(data.data.userId);
        setShowOtp(true);
        setOtpError("");
        toast.success(data.message || "OTP sent successfully");
      } else {
        toast.error(data.message || "Failed to register. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Network error. Please try again later.");
    }
  };

  // OTP submit
  const handleOtpSubmit = async (otp: string) => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await fetch("https://birthdaywisher-vopu.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data: ApiResponse = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        setShowOtp(false);
        toast.success(data.message || "OTP verified successfully!");
        navigate("/birthday-details", { state: { userId } });
      } else {
        setOtpError(data.error || "OTP verification failed.");
        toast.error(data.error || "OTP verification failed.");
      }
    } catch (err) {
      setLoading(false);
      setOtpError("Network error during OTP verification.");
      toast.error("Network error during OTP verification.");
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-purple-900/80"></div>

      <Navbar onMenuClick={() => console.log("Menu clicked!")} />

      <div className="mt-4 flex justify-center">
        <img src={progressImage} alt="progress" className="h-4" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md w-full p-6 mx-auto flex-grow">
        <img
          src={mainImage}
          alt="Cadbury Celebrations"
          className="w-64 h-auto object-contain mx-auto"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Register to create
        </h1>

        <form
          className="w-full flex flex-col space-y-4 relative"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
          />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg focus:outline-none text-black"
          />

          <label className="flex items-start space-x-2 text-white text-sm cursor-pointer text-left">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
              className="appearance-none w-5 h-5 border-2 border-white rounded-full 
               checked:bg-yellow-400 checked:border-yellow-400 flex-shrink-0 cursor-pointer transition mt-1"
            />
            <span>
              I accept Terms & Conditions and Privacy Policy of Mondelez
              (Cadbury)
            </span>
          </label>

          <label className="flex items-start space-x-2 text-white text-sm cursor-pointer text-left">
            <input
              type="checkbox"
              checked={promotions}
              onChange={() => setPromotions(!promotions)}
              className="appearance-none w-5 h-5 border-2 border-white rounded-full 
               checked:bg-yellow-400 checked:border-yellow-400 flex-shrink-0 cursor-pointer transition mt-1"
            />
            <span>
              I would like to receive promotional communication from Mondelez
              (Cadbury) about its products and offers.
            </span>
          </label>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-40 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-md hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {showOtp && (
        <OtpPopup
          onClose={() => setShowOtp(false)}
          onSubmit={handleOtpSubmit}
          onResend={() => toast.info("OTP resent")}
          error={otpError}
        />
      )}

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
    </div>
  );
};

export default Registration;
