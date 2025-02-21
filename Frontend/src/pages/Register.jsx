import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa6";
import bgImage from '../assets/bg.png';
import Login from "./Login";
import { useNavigate } from 'react-router-dom'

const Register = ({ setAuthState }) => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        registrationNumber: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Form Data:", formData);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true }));
        
            setAuthState(true);

            console.log("Registration Successful:", response.data);
            alert("Registration Successful");
            navigate("/");
        } catch (error) {
            console.error("Registration Failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration Failed");
        }
    };



    return (
        <div>
            <div className='flex h-screen ml-8 mr-8 mt-8 mb-0'>
                <div className="w-2/3 relative hidden lg:flex items-center justify-center">
                    <div className="absolute inset-0 bg-cover bg-center  bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 mb-28 mt-2 " style={{ backgroundImage: `url(${bgImage})` }}></div>
                </div>
                <div className='flex justify-center items-center w-auto min-h-screen pl-12 pb-24  mt-0 bg-white'>

                    <form onSubmit={handleSubmit} className="w-full">
                        <h2 className='text-black mb-7  text-3xl font-sans font-bold'>Create Account</h2>

                        <label className='text-gray-600 text-sm font-bold' htmlFor='name'>Full Name</label>
                        <input className='w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3' placeholder='Name..' type='text' name='name' value={formData.name} onChange={handleChange} /><br />

                        <label className='text-gray-600 text-sm font-bold' htmlFor='email'>Email</label>
                        <input className='w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3' placeholder='2022bcamafsmahima12414@poornima.edu.in' type='email' name='email' value={formData.email} onChange={handleChange} /><br />

                        <label className='text-gray-600 text-sm font-bold' htmlFor='pwd'>Password</label>
                        <input className='w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3' placeholder='**' type='password' name='password' value={formData.pwd} onChange={handleChange} /><br />

                        <label className='text-gray-600 text-sm font-bold' htmlFor='dept'>Department</label>
                        <select className='w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3' name='department' value={formData.dept} onChange={handleChange}>
                            <option value=""></option>
                            <option value="CSE">Computer Science</option>
                            <option value="ECE">Electronics & Communication</option>
                            <option value="ME">Mechanical Engineering</option>
                            <option value="CE">Civil Engineering</option>
                        </select><br />

                        <label className='text-gray-600 text-sm font-bold' htmlFor='regno'>Registration Number</label>
                        <input className='w-full border-b-2 border-gray-100 focus:border-purple-600 focus:outline-none p-0 mt-1 mb-3' placeholder='2022/12414' type='text' name='registrationNumber' value={formData.regno} onChange={handleChange} /><br />

                        {/* Sign Up & Sign In Buttons on the Same Line */}
                        <div className="flex justify-between items-center mt-5">
                            {/* Sign Up Button */}
                            <button className='text-white px-10 py-2 bg-gradient-to-r from-purple-600 to-pink-600 opacity-75 rounded-full font-semibold font-sans text-l' type='submit'>
                                Sign Up
                            </button>

                            {/* Sign In Button */}
                            <button
                                onClick={(e) => { e.preventDefault(); navigate("/login"); }}
                                className='flex items-center text-md text-gray-700'
                            >
                                <FaArrowRight className='size-5 mr-1' /> Sign In
                            </button>
                        </div>
                    </form>


                </div>
            </div>

        </div>
    );
};

export default Register;