import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
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
            console.log("egistration Successful:", response.data);
            alert("Registration Successful");
        } catch (error) {
            console.error("Registration Failed:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration Failed");
        }
    };
    
    

    return (
        <div className='flex justify-center items-center w-96 p-12 m-auto rounded-lg mt-20 bg-[#213A55]'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-gray-300 mb-4 text-3xl font-mono font-bold'>Create Account</h2>
                <label className='text-gray-300 mb-2 font-semibold' htmlFor='name'>Enter Your Name</label>
                <input className='rounded-sm mb-3 w-48' type='text' name='name' value={formData.name} onChange={handleChange} /><br />
                
                <label className='text-gray-300 mb-2 font-semibold' htmlFor='email'>Enter Your Email</label>
                <input className='rounded-sm mb-3 w-48' type='email' name='email' value={formData.email} onChange={handleChange} /><br />
                
                <label className='text-gray-300 mb-2 font-semibold' htmlFor='pwd'>Enter Your Password</label>
                <input className='rounded-sm mb-3 w-48' type='password' name='pwd' value={formData.pwd} onChange={handleChange} /><br />
                
                <label className='text-gray-300 mb-2 font-semibold' htmlFor='dept'>Enter Your Department</label>
                <input className='rounded-sm mb-3 w-48' type='text' name='dept' value={formData.dept} onChange={handleChange} /><br />
                
                <label className='text-gray-300 mb-2 font-semibold' htmlFor='regno'>Enter Your Registration Number</label>
                <input className='rounded-sm mb-3 w-48' type='text' name='regno' value={formData.regno} onChange={handleChange} /><br />
                
                <button className='text-neutral-800 p-2 hover:bg-[#b8c9e0] rounded-md mt-5 font-semibold text-2xl bg-[#e0e1dd]' type='submit'>
                    Create Your Account
                </button>
            </form>
        </div>
    );
};

export default Register;
