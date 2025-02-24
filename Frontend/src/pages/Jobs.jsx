import React from 'react'
import { TbListSearch } from "react-icons/tb";
import { PiBuildingsDuotone } from "react-icons/pi";  
import { MdCurrencyRupee } from "react-icons/md";  
import { IoIosTimer } from "react-icons/io";  
import { LuGraduationCap } from "react-icons/lu";  

const Jobs = () => {
  return (
    <div className='bg-[#f8f9fa] m-0'>
    <div className='pt-14 text-center text-2xl text-[#1A365D] font-bold'>Campus Placement Portal
      <p className=' text-[#4B5563] text-[15px] font-normal'>Current Opportunities for 2024 Batch
</p>
      </div>
      <div className="mt-16 ml-12 bg-white w-[93%] h-16 flex items-center gap-7 p-4 rounded-lg shadow-md">
  <div className="relative w-[65%]">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
    <TbListSearch size={23}/>
    </span>
    <input 
      type="search" 
      className="h-10 w-full pl-10 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" 
      placeholder="Search Opportunities" 
    />
  </div>
  <button className="h-10 px-5 py-2 rounded-md  text-base justify-between border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black">
    <select name="values" id="values" className='text-sm '>
      <option value="value0">All Departments</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
      <option value="value1">Computer Science</option>
    </select>
  </button>

  <button className="h-10 px-5 py-2 rounded-md  text-base justify-between border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black ">
    <select name="values" id="values" className='text-sm '>
      <option value="value0">All Types</option>
      <option value="value1">Full-Time placement</option>
      <option value="value1">Internships</option>
      <option value="value1">PPO Opportunity</option>
      
    
    </select>
  </button>

</div>

<div className='mt-8 ml-12 w-[93%] h-44 rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-all border border-gray-300 flex justify-between items-center'>

    {/* <!-- Left Content --> */}
    <div>
        <h2 class="font-semibold text-lg">Software Developer</h2>
        <p class="text-gray-600" ><PiBuildingsDuotone  className='h-4 w-4 mt-1 mr-1 float-left' />Tech Corp</p>
        <p class="text-sm text-gray-600 mt-3">Looking for talented software developers to join our team</p>
        <p className="text-sm text-gray-800 font-medium mt-3 flex items-center space-x-4">
    {/* Salary */}
    <span className="flex items-center space-x-1">
        <MdCurrencyRupee className="text-lg text-gray-800" />
        <span>12 LPA</span>
    </span>

    {/* Deadline */}
    <span className="flex items-center space-x-1 text-pink-600 font-medium">
        <IoIosTimer className="text-lg" />
        <span>Deadline: 5/1/2024</span>
    </span>

    {/* Min CGPA */}
    <span className="flex items-center space-x-1 text-gray-800">
        <LuGraduationCap className="text-lg" />
        <span>Min. CGPA: 7.5</span>
    </span>
</p>

    </div>

    {/* <!-- Right Content (Aligned to the right) --> */}
    <div class="flex flex-col items-end">
    <a href="#" class="text-white w-26 h-10 pt-2 pl-8 pr-8 rounded-md bg-[#1A365D]  font-medium hover:bg-gray-600 ">Apply Now</a>
        <p class=" text-sm mb-10 mt-3 m-auto bg-[#FCE7F3] rounded-full text-[#BE185D]">CSE, ESE</p>
       
    </div>
</div>




      </div>
    
  )
}

export default Jobs