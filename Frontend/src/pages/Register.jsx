import React, { useState } from 'react'

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pwd: "",
        dept: "",
        regno: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
      };

    
  return (
    <div className='flex justify-center items-center w-96 p-12 m-auto rounded-lg mt-20 bg-[#213A55]'>
        <form onSubmit={handleSubmit}>
        <h2 className='text-gray-300 mb-4 text-3xl font-mono font-bold'>Create Account</h2>
        <label className='text-gray-300 mb-2 font-semibold' htmlFor='name'>Enter Your name </label>
        <input className='rounded-sm mb-3 w-48' type='text' name='name' onChange={handleChange} /><br></br>
        <label className='text-gray-300 mb-2 font-semibold' htmlFor='email'>Enter Your Email here</label>
        <input className='rounded-sm mb-3 w-48' type='text' name='email' onChange={handleChange} /><br></br>
        <label className='text-gray-300 mb-2 font-semibold' htmlFor='pwd'>Enter Your Password here</label>
        <input className='rounded-sm mb-3 w-48' type='text' name='pwd' onChange={handleChange} /><br></br>
        <label className='text-gray-300 mb-2 font-semibold' htmlFor='dept'>Enter Your Department here</label>
        <input className='rounded-sm bg-[#F8F9FA] mb-3 w-48' type='text' name='dept' onChange={handleChange} /><br></br>
        <label className='text-gray-300 mb-2 font-semibold' htmlFor='regno'>Enter Your Registration Number here</label>
        <input className='rounded-sm mb-3 w-48' type='text' name='regno' onChange={handleChange} /><br></br>
        <button className='text-neutral-800 p-2 hover:bg-[#b8c9e0] rounded-md mt-5 font-semibold text-2xl bg-[#e0e1dd]' type='submit'>Create Your Account</button><br></br>
        </form>

     

    </div>
  )
}

export default Register