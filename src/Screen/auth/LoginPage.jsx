import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { encryptData } from "../../utils/authUtils";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import RiftLogo from "../../assets/Rift-Cars-Limited-2-1.png";

const Login = ({ setUser, onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { post } = useAxios();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
const handleLogin = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Email and password are required.");
    return;
  }

  try {
    // Define allowed roles based on email
    const allowedRoles = {
      "admin@example.com": "admin",
      "superadmin@example.com": "super_admin",
      "sales@example.com": "sales_person",
    };

    // Check if the email is in allowed roles
    const role = allowedRoles[formData.email.toLowerCase()];

    if (!role) {
      toast.error("Access Denied! You are not authorized.");
      navigate("/unauthorized"); // Redirect to Unauthorized Page
      return;
    }

    // Encrypt and save user role & email in local storage for OTP verification
    localStorage.setItem("user", encryptData({ email: formData.email, role }));

    // Navigate to OTP page
    toast.info("OTP verification required. Please enter the code sent to your email.");
    navigate("/verify-otp"); // Redirects to OTP page

  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed!");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F5FF] p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Rift Cars Logo */}
        <img src={RiftLogo} alt="Rift Cars Logo" className="w-60 mx-auto mb-4" />

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0056A6] focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0056A6] focus:outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#0056A6] text-white p-3 rounded-md font-semibold hover:bg-[#003E7E] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
