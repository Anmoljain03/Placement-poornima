import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { showSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [academicDetails, setAcademicDetails] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAcademic, setIsEditingAcademic] = useState(false);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Stored Token:", token); 
    
        if (!token) {
          console.error("No token found, user not authenticated.");
          return;
        }
    
        const headers = {
          "Content-Type": "application/json",
          "Authorization": token, // 
        };
    
        // console.log("Headers Sent:", headers);  
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: headers,
        });
    
        // console.log("Response Status:", response.status);
    
        const data = await response.json();
        // console.log("User Data:", data);
        
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };
    

    fetchUserData();
  }, []);

  // Fetch notifications dynamically for the logged-in user
  useEffect(() => {
    if (user?.registrationNumber) {
      fetch(`http://localhost:5000/api/notifications/${user.registrationNumber}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
          setUnreadCount(data.filter((n) => !n.read).length);
        })
        .catch((error) => console.error("Error fetching notifications:", error));
    }
  }, [user?.registrationNumber]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/updateProfile", {
        method: "PUT",
        headers: {
          "Authorization": token, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        showSuccessToast("Profile Updated Successfully!");
        localStorage.setItem("user", JSON.stringify(user));
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAcademicChange = (e) => {
    setAcademicDetails({ ...academicDetails, [e.target.name]: e.target.value });
  };

  const handleSaveAcademicDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/auth/updateAcademic", {
        method: "PUT",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(academicDetails),
      });

      if (response.ok) {
        showSuccessToast("Academic Details Updated Successfully!");
        localStorage.setItem("academicDetails", JSON.stringify(academicDetails));
        setIsEditingAcademic(false);
      } else {
        console.error("Failed to update academic details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div>
      <div className="px-10 p-10 m-auto items-center w-2/3 mt-7 rounded-lg h-auto bg-[#213A55] relative">
        <FaBell
          className="absolute top-6 right-6 text-white text-4xl cursor-pointer hover:text-yellow-400"
          onClick={() => navigate("/notifications")}
        />
        {unreadCount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            {unreadCount}
          </span>
        )}
        <div className="bg-[#324A6D] rounded-full p-8 w-32 h-32 float-left text-pink-400">
          <FiUser size={86} />
        </div>
        <div className="pl-40">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <RiGraduationCapLine size={26} className="h-5 w-5 float-left mr-2 mt-0.5 text-gray-300" />
          <p className="text-pink-200 flex items-center gap-2">{user.department}</p>
          <div className="grid md:grid-cols-2 grid-rows-1 gap-3 mt-5">
            <p className="text-sm text-pink-200 font-bold">University Email</p>
            <p className="text-white">{user.email}</p>
            <p className="text-sm text-pink-200 font-bold">Enrollment Number</p>
            <p className="text-white">{user.registrationNumber}</p>
            <p className="text-sm text-pink-200 font-bold">Academic Year</p>
            <p className="text-white">{user.academicYear}</p>
            <p className="text-sm text-pink-200 font-bold">Current Semester</p>
            <p className="text-white">{user.currentSemester}</p>
          </div>
        </div>
      </div>

      {/* Academic Details Section */}
      <div className="rounded-lg shadow-md p-6 ml-60 mr-60 border-2 border-[#1a365d] mt-[35px]">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-[#1a365d]">
          <IoBookOutline size={24} /> Academic Details
        </h3>
        <p className="text-gray-700 mt-2">CGPA: {academicDetails.cgpa || "N/A"}</p>
        <p className="text-gray-700 mt-2">SGPA: {academicDetails.sgpa || "N/A"}</p>
        <p className="text-gray-700 mt-2">Backlogs: {academicDetails.backlogs || "N/A"}</p>
        <p className="text-gray-700 mt-2">Attendance: {academicDetails.attendance || "N/A"}</p>
      </div>
    </div>
  );
};

export default Profile;