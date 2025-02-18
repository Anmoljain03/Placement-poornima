import React from 'react'
import { FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";


const Profile = () => {
  return (
    <div>
      <div className="px-10 p-10 m-auto items-center w-2/3 mt-7 rounded-lg h-80 bg-[#213A55]">
      <div className='bg-[#324A6D] rounded-full backdrop-blur-sm p-8 w-32 h-32 float-left text-pink-400 ' >
      <FiUser size={86} className='w-16 h-16'/>
     </div>
     {/* <div className='pl-40'>
      <h2 className='text-2xl font-bold'>Mahima Babani</h2>
      <RiGraduationCapLine size={26} className='h-5 w-5'/> <p className='text-pink-200 flex items-center gap-2'>Bachelor's Of Computer Application</p> */}
     
     {/* </div> */}

      
      </div>
    </div>
  )
}

export default Profile