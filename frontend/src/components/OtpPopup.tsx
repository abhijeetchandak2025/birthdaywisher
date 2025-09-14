import React, { useState } from "react";

interface OtpPopupProps {
  onClose: () => void;
  onSubmit: (otp: string) => void;
  onResend: () => void;
  error?: string;
}

const OtpPopup: React.FC<OtpPopupProps> = ({ onClose, onSubmit, onResend, error }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = () => {
    onSubmit(otp.join(""));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-6 text-center relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-purple-900 mb-4">Enter OTP</h2>

        {/* OTP Inputs */}
        <div className="flex justify-center space-x-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg font-bold border-2 border-purple-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm mb-2">
            {error}
          </p>
        )}

        {/* Resend OTP */}
        <button
          type="button"
          onClick={onResend}
          className="text-purple-900 text-sm font-semibold mb-4 hover:underline"
        >
          Resend OTP
        </button>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-yellow-400 text-purple-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpPopup;
