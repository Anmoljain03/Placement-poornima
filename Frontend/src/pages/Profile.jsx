// import React from 'react'
// import { FiUser } from "react-icons/fi";
// import { RiGraduationCapLine } from "react-icons/ri";
// import { IoBookOutline } from "react-icons/io5";


// const Profile = () => {
//   return (
//     <div>
//       <div className="px-10 p-10 m-auto items-center w-2/3 mt-7 rounded-lg h-80 bg-[#213A55]">
//       <div className='bg-[#324A6D] rounded-full backdrop-blur-sm p-8 w-32 h-32 float-left text-pink-400 ' >
//       <FiUser size={86} className='w-16 h-16'/>
//      </div>
//      <div className='pl-40'>
//       <h2 className='text-2xl font-bold text-white'>Mahima Babani</h2>
//       <RiGraduationCapLine size={26} className='h-5 w-5 float-left mr-2 mt-0.5 text-gray-300'/> <p className='text-pink-200 flex items-center gap-2'>Bachelor's Of Computer Application</p>
//      <div className='grid md:grid-cols-2 grid-rows-1 gap-3 mt-5'>

//      <p className='text-sm text-pink-200 font-bold'>University Email</p>
//      <p className='text-white'>2022bcamafsmahima12414@poornima.edu.in</p>
     
//      <p className='text-sm text-pink-200 font-bold'>Enrollment Number</p>
//      <p className='text-white'> 2022PUFCEBMFX12414</p>
     
//      <p className='text-sm text-pink-200 font-bold'>Academic Year</p>
//      <p className='text-white'>2022-2025</p>

//      <p className='text-sm text-pink-200 font-bold'>Current Semester</p>
//      <p className='text-white'>8th semester</p>

//      </div>

//     <button className='inline-flex mt-4 ml-48 text-white font-semibold text-sm p-2 justify-center items-center gap-2 whitespace-nowrap rounded-md bg-[#EC4899] hover:bg-[#da2f84]'>Edit Profile</button>

//       </div>

//       <div className='rounded-lg  shadow-md  p-6 border-2 border-[#1a365d] mt-[60px]'>
//        <h3 className='text-xl font-semibold flex items-center gap-2 text-[#1a365d]'><IoBookOutline size={24} className='font-bold'/>Academic Details</h3>
       
//        <div className='flex justify-between items-center mt-3'>
//         <span className='text-gray-600 mt-2'>Current CGPA</span>
//         <span className='font-semibold text-[#1a365d] '>8.5</span>
//         </div>

//         <div className='flex justify-between items-center'>
//         <span className='text-gray-600 mt-2'>Previous Semester SGPA</span>
//         <span className='font-semibold text-[#1a365d] mt-1'>8.7</span>
//         </div>

//         <div className='flex justify-between items-center'>
//         <span className='text-gray-600 mt-2'>Active Backlogs</span>
//         <span className='font-semibold text-green-600 mt-1'>None</span>
//         </div>

//         <div className='flex justify-between items-center'>
//         <span className='text-gray-600 mt-2'>Attendance</span>
//         <span className='font-semibold text-[#1a365d] mt-1'>85%</span>
//         </div>

//       </div>

      
//       </div>
//     </div>
//   );
// }

// export default Profile




import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { showSuccessToast } from "../utils/toast";

const Profile = () => {
  // ✅ State for user details
  const [user, setUser] = useState({
    name: "",
    email: "",
    department: "",
    registrationNumber: "",
    academicYear: "2022-2025",
    currentSemester: "8th semester"
  });

  // ✅ State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch user details from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Handle input changes for editable fields
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Save updated data back to localStorage
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    showSuccessToast("Profile Updated Successfully!");
  };

  const [academicDetails, setAcademicDetails] = useState({
    cgpa: "",
    sgpa: "",
    backlogs: "",
    attendance: ""
  });

  // ✅ State for editing mode in Academic Details
  const [isEditingAcademic, setIsEditingAcademic] = useState(false);

  // ✅ Fetch stored details from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedAcademicDetails = localStorage.getItem("academicDetails");
    if (storedAcademicDetails) {
      setAcademicDetails(JSON.parse(storedAcademicDetails));
    }
  }, []);

  // ✅ Handle input changes for Academic Details
  const handleAcademicChange = (e) => {
    setAcademicDetails({ ...academicDetails, [e.target.name]: e.target.value });
  };

  // ✅ Save Academic Details to localStorage
  const handleSaveAcademicDetails = () => {
    localStorage.setItem("academicDetails", JSON.stringify(academicDetails));
    setIsEditingAcademic(false);
    showSuccessToast("Academic Details Updated Successfully!");
  };

  

  return (
    <div>
      <div className="px-10 p-10 m-auto items-center w-2/3 mt-7 rounded-lg h-auto bg-[#213A55]">
        <div className="bg-[#324A6D] rounded-full backdrop-blur-sm p-8 w-32 h-32 float-left text-pink-400">
          <FiUser size={86} className="w-16 h-16" />
        </div>
        <div className="pl-40">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <RiGraduationCapLine size={26} className="h-5 w-5 float-left mr-2 mt-0.5 text-gray-300" /> 
          <p className="text-pink-200 flex items-center gap-2">{user.department}</p>

          <div className="grid md:grid-cols-2 grid-rows-1 gap-3 mt-5">
            <p className="text-sm text-pink-200 font-bold">University Email</p>
            <p className="text-white">{user.email}</p>

            <p className="text-sm text-pink-200 font-bold">Enrollment Number</p>
            {isEditing ? (
              <input
                type="text"
                name="registrationNumber"
                value={user.registrationNumber}
                onChange={handleChange}
                className=" rounded-md bg-gray-300 text-black"
              />
            ) : (
              <p className="text-white">{user.registrationNumber}</p>
            )}

            <p className="text-sm text-pink-200 font-bold">Academic Year</p>
            {isEditing ? (
              <input
                type="text"
                name="academicYear"
                value={user.academicYear}
                onChange={handleChange}
                className=" rounded-md bg-gray-300 text-black"
              />
            ) : (
              <p className="text-white">{user.academicYear}</p>
            )}

            <p className="text-sm text-pink-200 font-bold">Current Semester</p>
            {isEditing ? (
              <input
                type="text"
                name="currentSemester"
                value={user.currentSemester}
                onChange={handleChange}
                className=" rounded-md bg-gray-300 text-black"
              />
            ) : (
              <p className="text-white">{user.currentSemester}</p>
            )}
          </div>

          {/* Edit & Save Button */}
          {!isEditing ? (
            <button
              className="inline-flex mt-4 ml-48 text-white font-semibold text-sm p-2 justify-center items-center gap-2 whitespace-nowrap rounded-md bg-[#EC4899] hover:bg-[#da2f84]"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="inline-flex mt-4 ml-48 text-white font-semibold text-sm p-2 justify-center items-center gap-2 whitespace-nowrap rounded-md bg-[#EC4899] hover:bg-[#da2f84]"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
        </div>

        {/* Academic Details Section */}
        <div className="rounded-lg shadow-md p-6 ml-60 mr-60 border-2  border-[#1a365d] mt-[35px]">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-[#1a365d]">
            <IoBookOutline size={24} className="font-bold" /> Academic Details
          </h3>

          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-600 mt-2">Current CGPA</span>
            {isEditingAcademic ? (
            <input
              type="text"
              name="cgpa"
              value={academicDetails.cgpa}
              onChange={handleAcademicChange}
              className=" rounded-md  text-black"
            />
          ) : (
            <span className="font-semibold text-[#1a365d]">{academicDetails.cgpa || "N/A"}</span>
          )}
           
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 mt-2">Previous Semester SGPA</span>
            {isEditingAcademic ? (
            <input
              type="text"
              name="sgpa"
              value={academicDetails.sgpa}
              onChange={handleAcademicChange}
              className=" rounded-md  text-black"
            />
          ) : (
            <span className="font-semibold text-[#1a365d]">{academicDetails.sgpa || "N/A"}</span>
          )}
           
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 mt-2">Active Backlogs</span>
            {isEditingAcademic ? (
            <input
              type="text"
              name="backlogs"
              value={academicDetails.backlogs}
              onChange={handleAcademicChange}
              className=" rounded-md  text-black"
            />
          ) : (
            <span className="font-semibold text-green-600">{academicDetails.backlogs || "N/A"}</span>
          )}
            
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 mt-2">Attendance</span>
            {isEditingAcademic ? (
            <input
              type="text"
              name="attendance"
              value={academicDetails.attendance}
              onChange={handleAcademicChange}
              className=" rounded-md  text-black"
            />
          ) : (
            <span className="font-semibold text-[#1a365d]">{academicDetails.attendance || "N/A"}</span>
          )}
          
          </div>
         
         {/* Edit & Save Buttons */}
        {!isEditingAcademic ? (
          <button
            className="mt-4 px-4 py-2 rounded-md font-semibold bg-[#1a365d] hover:bg-blue-700 text-white"
            onClick={() => setIsEditingAcademic(true)}
          >
            Edit Academic Details
          </button>
        ) : (
          <button
            className="mt-4 px-4 py-2 rounded-md font-semibold bg-[#EC4899] hover:bg-[#da2f84] text-white"
            onClick={handleSaveAcademicDetails}
          >
            Save Academic Details
          </button>
        )}

        </div>
      </div>
    
  );
};

export default Profile;
