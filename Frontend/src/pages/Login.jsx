import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast, showWarningToast } from "../utils/toast";

const Login = ({ setAuthState }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    registrationNumber: ""
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Login with Email & Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData);
        
        // console.log("Login Response:", response.data);  // 

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id); 
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));

        setAuthState(true);
        showSuccessToast("Login Successful");
        navigate("/");
    } catch (error) {
        console.error("Login Failed:", error.response?.data || error.message);
        showErrorToast(error.response?.data?.message || "Login Failed");
    }
};

  // 🔹 Send OTP for password reset
  const handleSendOTP = async () => {
    if (!email) {
      showWarningToast("Please enter your email.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      if (res.data.success) {
        setOtpSent(true);
        showSuccessToast("OTP sent successfully!");
      }
    } catch (error) {
      console.error("OTP sending failed:", error.response?.data || error.message);
      showWarningToast(error.response?.data?.message || "Error sending OTP. Try again.");
    }
  };

  // 🔹 Verify OTP & log in
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      if (response.data.token) {
        // Save authentication details
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Save user details
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
        
        setAuthState(true);
        showSuccessToast("Login successful!");
        navigate("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data?.message);
      showErrorToast(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#36417c] to-[#d33b69] p-6 transition-all duration-300">
      <div className="w-full max-w-md bg-[#0A1734] p-8 rounded-2xl mb-24 shadow-lg border border-[#d33b69] transition-all duration-300">
        {!showForgotPassword ? (
          // 🔹 Login Form
          <div>
            <h2 className="text-[#d33b69] text-4xl font-bold text-center mb-6 font-mono">Login</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="text-gray-300 font-semibold block mb-1">Email</label>
                <input
                  className="w-full p-3 rounded-md bg-[#132F5E] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-300 font-semibold block mb-1">Password</label>
                <input
                  className="w-full p-3 rounded-md bg-[#132F5E] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-gray-300 font-semibold block mb-1">Registration Number</label>
                <input
                  className="w-full p-3 rounded-md bg-[#132F5E] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Enter your registration number"
                  required
                />
              </div>

              <button className="w-full bg-[#d33b69] text-white p-3 font-sans rounded-md text-lg font-bold hover:bg-[#ff3366] transition-all duration-300 shadow-md transform hover:scale-105" type="submit">
                Login
              </button>
            </form>

            <button
              className="bg-slate-200 font-medium hover:bg-[#ff3366] transition-all duration-300 shadow-md transform hover:scale-105 text-[#1A365D] rounded p-3 mt-7 w-full"
              onClick={() => setShowForgotPassword(true)}
            >
              🔐 Forgot Password
            </button>
          </div>
        ) : (
          // 🔹 Forgot Password (OTP Login)
          <div>
            <h2 className="text-[#d33b69] text-3xl font-bold text-center mb-6 font-mono">Forgot Password</h2>
            {!otpSent ? (
              <>
                <input
                  className="w-full p-3 rounded-md bg-[#132F5E] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />

                <button
                  className="w-full bg-[#d33b69] mt-4 text-white p-3 font-sans rounded-md text-lg font-bold hover:bg-[#ff3366] transition-all duration-300 shadow-md transform hover:scale-105"
                  onClick={handleSendOTP}
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  className="w-full p-3 mb-4 rounded-md bg-[#132F5E] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#d33b69] outline-none transition-all duration-300 hover:bg-[#1E3A8A]"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="w-full bg-[#d33b69] text-white p-3 font-sans rounded-md text-lg font-bold hover:bg-[#ff3366] transition-all duration-300 shadow-md transform hover:scale-105"
                  onClick={handleVerifyOTP}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
