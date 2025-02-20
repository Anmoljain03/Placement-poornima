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
        <div className="flex justify-center items-center w-96 p-12 m-auto rounded-lg mt-20 bg-[#213A55]">
            <form onSubmit={handleSubmit} className="w-full">
                <h2 className="text-gray-300 mb-4 text-3xl font-mono font-bold text-center">Login</h2>

                <div className="mb-3">
                    <label className="text-gray-300 font-semibold block">Email</label>
                    <input
                        className="rounded-sm w-full p-2 text-black"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-300 font-semibold block">Password</label>
                    <input
                        className="rounded-sm w-full p-2 text-black"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-300 font-semibold block">Registration Number</label>
                    <input
                        className="rounded-sm w-full p-2 text-black"
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className="text-neutral-800 p-2 hover:bg-[#b8c9e0] rounded-md mt-5 font-semibold text-2xl bg-[#e0e1dd] w-full"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
