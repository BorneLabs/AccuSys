import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { decryptData } from "../../utils/authUtils";
import { toast } from "react-toastify";
import RiftLogo from "../../assets/Rift-Cars-Limited-2-1.png";

const OtpVerification = ({ onLogin }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [user, setUser] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from local storage
    const encryptedUser = localStorage.getItem("user");
    if (encryptedUser) {
      const userData = decryptData(encryptedUser);
      console.log("User Data Loaded:", userData); // Debugging
      setUser(userData);
    }
  }, []);

  // Handle OTP input
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Submission (No Backend - Direct Navigation)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    // Ensure user data is loaded before attempting navigation
    if (!user || !user.role) {
      toast.error("User role not found. Please log in again.");
      return;
    }

    toast.success("OTP Verified! Redirecting...");
    if (onLogin) onLogin();

    // Ensure role navigation works
    setTimeout(() => {
      switch (user.role.toLowerCase()) {
        case "admin":
          console.log("Redirecting to /admin/dashboard"); // Debugging
          navigate("/admin/dashboard");
          break;
        case "super_admin":
          console.log("Redirecting to /admin/dashboard"); // Debugging
          navigate("/admin/dashboard");
          break;
        case "sales_person":
          console.log("Redirecting to /sales/dashboard"); 
          navigate("/sales/dashboard");
          break;
        default:
          console.log("Redirecting to /advertiser/ads"); // Debugging
          navigate("/advertiser/ads");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F5FF] p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
      >
        {/* Rift Cars Logo */}
        <img src={RiftLogo} alt="Rift Cars Logo" className="w-40 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-center text-[#0056A6]">
          OTP Verification
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border-2 border-gray-300 text-center text-xl font-bold rounded-md focus:border-[#0056A6] focus:ring-2 focus:ring-[#0056A6] transition"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0056A6] text-white p-3 rounded-md font-semibold hover:bg-[#003E7E] transition"
          >
            Verify OTP
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
