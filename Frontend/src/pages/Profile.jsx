import React, { useState, useEffect } from "react";
import { showSuccessToast } from "../utils/toast";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChartLine, FaExclamationCircle, FaPercentage, FaEdit, FaSave, FaCamera, FaCalendar, FaBriefcase } from "react-icons/fa";
import { GrResources } from "react-icons/gr";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("academic");
  const [isEditing, setIsEditing] = useState(false);
  const [applications, setApplications] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    registrationNumber: "",
    department: "",
    academicYear: "",
    aboutMe: "",
    semester: "",
    cgpa: "",
    backlogs: "",
    attendance: "",
    profilePicture: null,
    applications: 0,
    interviews: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
  
      // ✅ Ensure `backlogs` is always a number
      setUser({
        ...parsedUser,
        backlogs: Number(parsedUser.backlogs) || 0,
      });
  
      calculateProfileCompletion(parsedUser);
    }
  
    fetchUserData();
  }, []);
  

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data from API:", data);
  
        const newUserData = {
          id: data._id || "",
          name: data.name || "",
          email: data.email || "",
          registrationNumber: data.registrationNumber || "",
          department: data.department || "",
          applications: data.applications || 0,
          interviews: data.interviews || 0,
          cgpa: data.cgpa || "",
          academicYear: data.academicYear || "",
          backlogs: Number.isInteger(data.backlogs) ? data.backlogs : 0, // ✅ Ensures `0` is not replaced
          attendance: data.attendance || "",
          profilePicture: data.profilePicture || null,
        };
  
        setUser(newUserData);
        setApplications(data.applications || 0);
        setNotifications(data.notifications || 0);
        calculateProfileCompletion(newUserData);
  
        localStorage.setItem("user", JSON.stringify(newUserData));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };
  

  const calculateProfileCompletion = (data) => {
    const fields = ["profilePicture", "cgpa", "academicYear", "backlogs", "attendance"];
    const filledFields = fields.filter((field) => data[field]);
    const completionPercentage = (filledFields.length / fields.length) * 100;
    setProfileCompletion(completionPercentage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    calculateProfileCompletion(updatedUser);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const updatedBacklogs = user.backlogs !== undefined ? user.backlogs : 0; // 👀 Ensure 0 is sent
  
      console.log("Sending Data:", {  
        cgpa: user.cgpa,
        academicYear: user.academicYear,
        backlogs: updatedBacklogs,  // 🔥 Ensure it's a number
        attendance: user.attendance,
        profilePicture: imagePreview || user.profilePicture, 
      });
  
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          cgpa: user.cgpa,
          academicYear: user.academicYear,
          backlogs: user.backlogs,
          attendance: user.attendance,
          profilePicture: imagePreview || user.profilePicture, 
        }),
      });
  
      if (!response.ok) {
        console.error("Error updating profile");
        return;
      }
  
      // ✅ Ek baar hi response.json() call karo
      const data = await response.json();
      console.log("Response from server:", data);
  
      showSuccessToast("Profile Updated Successfully!");
      setIsEditing(false);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user)); 
  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleProfileImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, profilePicture: reader.result };
        setImagePreview(reader.result);
        setUser(updatedUser);
        calculateProfileCompletion(updatedUser);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  
  return (
    <div className="p-6 mx-auto bg-white shadow-lg">
    <div className="bg-[#011e39] p-8 w-full max-w-screen-xl mx-auto shadow-lg text-white rounded-lg relative">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">

        {/* Profile Image with Camera Icon */}
        <div
          className="relative w-28 h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden"
          onClick={handleProfileImageClick}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/10 border-2 border-white/30 rounded-full group-hover:bg-orange-100 group-hover:border-teal-600 transition-all duration-200">
              <FaCamera className="text-4xl text-white group-hover:text-white transition-colors duration-200" />
            </div>
          )}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* User Details */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl font-bold mt-1">{user.name}</h2>
          <p className="text-xl">{user.department}</p>
          <p className="text-lg mt-1 text-gray-300">{user.email}</p>
        </div>

        {/* Profile Completion Box */}
        <motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="absolute lg:right-10 right-1/2 transform lg:translate-x-0 translate-x-1/2 top-full lg:top-0 mt-4 lg:mt-0 
             flex items-center justify-between bg-white/10 border border-white/20 
             rounded-lg p-4 w-72 shadow-sm z-10"
        >
          <span className="text-white text-lg font-medium">Complete Your Profile</span>

          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 64 64">
              {/* Background Circle (Gray) */}
              <circle cx="32" cy="32" r="28" strokeWidth="4" stroke="#e5e7eb" fill="transparent" />
              
              {/* Progress Circle */}
              <motion.circle
                cx="32" cy="32" r="28" strokeWidth="4" stroke="teal"
                fill="transparent"
                strokeDasharray="176"  // Adjusted for full circumference
                strokeDashoffset={176 * (1 - profileCompletion / 100)}  
                initial={{ strokeDashoffset: 176 }}  
                animate={{ strokeDashoffset: 176 * (1 - profileCompletion / 100) }} 
                transition={{ duration: 0.8, ease: "easeInOut" }}
                strokeLinecap="round"
              />
            </svg>

            {/* Percentage Label */}
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
              {profileCompletion}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Applications & Notifications Section */}
      <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-center hover:bg-white/20">
          <p className="text-lg font-semibold">{applications}</p>
          <p className="text-sm">Applications</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-center hover:bg-white/20">
          <p className="text-lg font-semibold">{notifications}</p>
          <p className="text-sm">Notifications</p>
        </div>
      </div>

      {/* Save Button to Update Profile */}
    </div>

    

      {/* Profile Info Box */}
   

      {/* Navbar */}
      <div className="flex flex-wrap justify-center gap-4 bg-white rounded-lg p-3 shadow-md w-[95%] sm:w-[80%] mx-auto">

  {[
    { tab: "academic", icon: "📖" },
    { tab: "resources", icon: "📂" },
    { tab: "alumni", icon: "🎓" },
  ].map(({ tab, icon }) => (
    <button
      key={tab}
      className={`flex items-center space-x-2 px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${
        activeTab === tab
          ? "text-white bg-gradient-to-r from-[#243b53] to-[#3a4957] shadow-md"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab(tab)}
    >
      <span>{icon}</span>
      <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
    </button>
  ))}
</div>

 
      {/* Academic Details */}
{activeTab === "academic" && (
  <div className="bg-gradient-to-br from-white to-blue-200 backdrop-blur-lg shadow-lg border border-gray-200 p-6 rounded-xl w-full sm:w-[90%] md:w-[80%] mx-auto mt-10">


    {/* Heading */}
    <div className="flex items-center w-full text-gray-800 rounded-t-xl py-3 px-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center w-full text-gray-800">Academic Overview</h2>
    </div>

    {/* Academic Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">

      
      {/* CGPA with Progress Bar */}
      <div>
        <div className="flex items-center mb-2">
          <FaChartLine className="text-blue-900 mr-2" />
          <label className="font-medium">CGPA</label>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            name="cgpa"
            value={user.cgpa}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-3 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Academic Year */}
      <div>
        <div className="flex items-center mb-2">
          <FaCalendar className="text-blue-900 mr-2" />
          <label className="font-medium">Academic Year</label>
        </div>
        <input
          type="text"
          name="academicYear"
          value={user.academicYear}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full p-3 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Backlogs */}
      <div>
        <div className="flex items-center mb-2">
          <FaExclamationCircle className="text-red-500 mr-2" />
          <label className="font-medium">Backlogs</label>
        </div>
        <input
          type="text"
          name="backlogs"
          value={user.backlogs}
          onChange={handleInputChange}
          disabled={!isEditing}
          className="w-full p-3 border rounded-md bg-gray-100 focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Attendance with Progress Bar */}
      <div>
        <div className="flex items-center mb-2">
          <FaPercentage className="text-green-500 mr-2" />
          <label className="font-medium">Attendance (%)</label>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            name="attendance"
            value={user.attendance}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-3 border rounded-md bg-gray-100 focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>

    {/* Horizontal Line */}
    <hr className="my-6 border-t-2 border-gray-200" />

    {/* Edit Button (Centered) */}
    <div className="flex justify-center mt-6">
      {!isEditing ? (
        <button
          className="px-8 py-3 bg-gradient-to-r from-[#243b53] to-[#3a4957] text-white rounded-full flex items-center gap-2 text-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-none animate-pulse"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit className="text-xl" /> Edit
        </button>
      ) : (
        <button
          className="px-8 py-3 bg-gradient-to-r from-[#243b53] to-[#3a4957] text-white rounded-full flex items-center gap-2 text-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-none"
          onClick={handleSave}
        >
          <FaSave className="text-xl" /> Save
        </button>
      )}
    </div>

    {/* Horizontal Line */}
    <hr className="my-6 border-t-2 border-gray-200" />

    {/* Next Steps Section */}
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Next Steps</h3>
        <p className="text-lg text-gray-600 mt-2">Continue to apply for jobs</p>
      </div>
      <button
        className="px-8 py-3 bg-gradient-to-r from-[#243b53] to-[#3a4957] text-white rounded-full flex items-center gap-2 text-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-none"
        onClick={() => window.location.href = '/jobs'}
      >
        <FaBriefcase className="mr-2" /> View Jobs
      </button>
    </div>
  </div>
)}


  



      {/* Resources Section */}
      {activeTab === "resources" && (
  <div className="mt-10 bg-gradient-to-br from-white to-blue-200 border border-white/20 p-8 rounded-3xl shadow-xl w-[85%] mx-auto">
    {/* Title Section */}
    <div className="flex items-center mb-5 w-full text-gray-800 rounded-t-xl py-3 px-6">
      <h2 className="text-4xl font-bold text-center w-full text-gray-800">Placement Resources</h2>
    </div>
    {/* Resources Grid Layout with 2 Items per Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* First Resource */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">GeeksForGeeks Interview Questions</h3>
        <p className="text-gray-600 mb-4">GeeksForGeeks provides a comprehensive list of interview questions across various tech domains.</p>
        <button className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out">
          Access Resource
        </button>
      </div>

      {/* Second Resource */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">LeetCode Coding Problems</h3>
        <p className="text-gray-600 mb-4">LeetCode offers coding problems categorized by difficulty and company-specific questions.</p>
        <button className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out">
          Access Resource
        </button>
      </div>

      {/* Third Resource */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">InterviewBit Practice</h3>
        <p className="text-gray-600 mb-4">InterviewBit offers a structured learning path and interview preparation tools.</p>
        <button className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out">
          Access Resource
        </button>
      </div>

      {/* Fourth Resource */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Apna College DSA Playlist</h3>
        <p className="text-gray-600 mb-4">Apna College offers a YouTube playlist focused on DSA topics and interview prep.</p>
        <button className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out">
          Access Resource
        </button>
      </div>
    </div>
  </div>
)}



{activeTab === "alumni" && (
  <div className="mt-10 bg-gradient-to-br from-white to-blue-200 p-8 rounded-3xl shadow-xl w-[85%] mx-auto">
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Alumni Connect</h2>

  {/* Alumni Cards Grid Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
    {/* First Alumni Card */}
    <div className="bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:bg-blue-50 hover:shadow-3xl">
      <div className="flex items-center justify-start mb-6 space-x-6">
        {/* Avatar Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-xl font-semibold">
          A
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Anmol</h3>
          <p className="text-md text-gray-600 mb-1">Full Stack Developer</p>
          <p className="text-md text-gray-600">Company: Infograins</p>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/anmol-jain-8b204823a/" target="_blank" className="text-blue-600 hover:underline font-semibold mt-3 inline-block transform hover:scale-105 transition duration-300 ease-in-out">
        LinkedIn Profile
      </a>
    </div>

    {/* Second Alumni Card */}
    <div className="bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:bg-purple-50 hover:shadow-3xl">
      <div className="flex items-center justify-start mb-6 space-x-6">
        {/* Avatar Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white flex items-center justify-center text-xl font-semibold">
          M
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Mahima</h3>
          <p className="text-md text-gray-600 mb-1">Backend Developer</p>
          <p className="text-md text-gray-600">Company: Infograins</p>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/mahima-babani-624184278/" target="_blank" className="text-blue-600 hover:underline font-semibold mt-3 inline-block transform hover:scale-105 transition duration-300 ease-in-out">
        LinkedIn Profile
      </a>
    </div>

    {/* Third Alumni Card */}
    <div className="bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:bg-green-50 hover:shadow-3xl">
      <div className="flex items-center justify-start mb-6 space-x-6">
        {/* Avatar Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-yellow-600 text-white flex items-center justify-center text-xl font-semibold">
          V
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Vansh</h3>
          <p className="text-md text-gray-600 mb-1">Frontend Developer</p>
          <p className="text-md text-gray-600">Company: Infograins</p>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/vansh-khandewal-9575a22a5/" target="_blank" className="text-blue-600 hover:underline font-semibold mt-3 inline-block transform hover:scale-105 transition duration-300 ease-in-out">
        LinkedIn Profile
      </a>
    </div>

    {/* Fourth Alumni Card */}
    <div className="bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:bg-orange-50 hover:shadow-3xl">
      <div className="flex items-center justify-start mb-6 space-x-6">
        {/* Avatar Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white flex items-center justify-center text-xl font-semibold">
          C
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Chhavi</h3>
          <p className="text-md text-gray-600 mb-1">Cybersecurity Analyst</p>
          <p className="text-md text-gray-600">Company: Infograins</p>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/chhavi-chaturvedi-b728b1262/" target="_blank" className="text-blue-600 hover:underline font-semibold mt-3 inline-block transform hover:scale-105 transition duration-300 ease-in-out">
        LinkedIn Profile
      </a>
    </div>
  </div>
</div>

)}


    </div>
  );
};

export default Profile;
