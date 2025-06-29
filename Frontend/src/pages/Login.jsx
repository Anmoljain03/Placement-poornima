

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { LuGraduationCap } from "react-icons/lu";
import { FiBriefcase } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineMailOutline, MdAppRegistration } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData);

        // Store the correct user ID
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));

        setAuthState(true);
        showSuccessToast("Login Successful");
        navigate("/profile");
    } catch (error) {
        showErrorToast(error.response?.data?.message || "Login Failed");
    }
};
;

  const handleSendOtp = async () => {
    if (!email) {
        showErrorToast("Please enter your email!");
        return;
    }
    
    try {
        const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
        
        if (response.data.success) {
            setOtpSent(true);
            showSuccessToast("OTP sent successfully!");
        } else {
            showErrorToast(response.data.message || "Failed to send OTP");
        }
    } catch (error) {
        showErrorToast(error.response?.data?.message || "Error sending OTP");
    }
};

const handleOtpVerification = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
      email,
      otp,
    });

    if (response.data.token) {
      showSuccessToast("OTP Verified! Login Successful");

      // Store authentication details
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));

      setAuthState(true);
      navigate("/profile"); // Redirect user after successful OTP verification
    } else {
      showErrorToast(response.data.message || "Invalid OTP. Please try again.");
    }
  } catch (error) {
    showErrorToast(error.response?.data?.message || "OTP Verification Failed");
  }
};





  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f0f4f8] to-white">
      {/* Left Section */}
      <div className="hidden md:flex flex-col md:w-2/5 lg:w-1/3 bg-gradient-to-br from-[#1a365d] via-[#243b53] to-[#334e68] p-8 text-white">
        <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 mr-20 rounded-xl animate-bounce">
          <LuGraduationCap className="size-7" />
          <span className="text-lg font-bold">Poornima Placements</span>
        </div>
        <div className="mt-6 space-y-6">
        <h1 className="text-md font-bold text-white leading-tight mt-1 ml-0">Discover Your <span className="text-red-400">Dream Carrer</span></h1>              <p className="text-white/80 text-lg">Access personalized job opportunities from top companies tailored to your skills and aspirations</p>
          <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 border border-white/10 shadow-lg">
              <div className="flex space-x-4">
                <FiBriefcase className="h-8 w-8" />
                <div className="space-y-2">
           <h3 className="text-white font-semibold text-xl">500+ Companies</h3>
           <p className="text-white/70">Access opportunities from top-tier companies</p>
    </div>

              </div>
            </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-transform duration-300 border border-white/10 shadow-lg">
              <div className="flex space-x-4">
                <IoMdCheckmarkCircleOutline className="h-8 w-8" />
                <div className="space-y-2">
             <h3 className="text-white font-semibold text-xl">Verified Campus Placements</h3>
             <p className="text-white/70">Secure your future with trusted companies</p>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full flex justify-center items-center p-6">
        <div className="w-full mb-20 max-w-md bg-white p-8  shadow-lg rounded-lg">
          {!showForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
              <p className="text-center text-gray-500 mb-6">Enter your credentials to access the portal</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <MdOutlineMailOutline className="absolute left-3 top-4 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="University Email" required className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-3 top-4 text-gray-400" />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                  <MdAppRegistration className="absolute left-3 top-4 text-gray-400" />
                  <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" required className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-between text-sm">
                  <span></span>
                  <button onClick={() => setShowForgotPassword(true)} className="text-blue-500 hover:underline">Forgot password?</button>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">→ Sign in</button>
              </form>
              <p className="text-center text-gray-600 mt-4">Don't have an account? <button onClick={() => navigate("/register")} className="text-blue-500 font-semibold hover:underline">Create account →</button></p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
              {!otpSent ? (
                <>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-4" required />
                  <button onClick={handleSendOtp} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-4">Send OTP</button>

                </>
              ) : (
                <>
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mt-4" />
                  <button onClick={handleOtpVerification} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-4">
  Verify OTP
</button>

                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


