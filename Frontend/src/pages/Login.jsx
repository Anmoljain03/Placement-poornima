import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthState }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        registrationNumber: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData);
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
    
        setAuthState(true);
    
        alert("Login Successful");
        navigate("/");
      } catch (error) {
        console.error("Login Failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Login Failed");
      }
    };

    

    return (
        
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#36417c] to-[#d33b69] p-6">
      <div className="w-full max-w-md bg-[#0A1734] p-8 rounded-2xl shadow-lg border border-[#d33b69]">
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
          
          <button
            className="w-full bg-[#d33b69] text-white p-3 font-sans rounded-md text-lg font-bold hover:bg-[#ff3366] transition-all duration-300 shadow-md transform hover:scale-105"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    );
};

export default Login;
