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
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAcademic, setIsEditingAcademic] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchUserData();
    }
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
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

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

  const handleSave = () => {
    showSuccessToast("Profile Updated Successfully!");
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
  };

  const handleSaveAcademic = () => {
    showSuccessToast("Academic Details Updated Successfully!");
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditingAcademic(false);
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-7">
      {/* Profile Box */}
      <div className="px-10 p-10 w-2/3 rounded-lg bg-[#213A55] relative">
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
            {isEditing ? (
              <input
                type="text"
                name="academicYear"
                value={user.academicYear}
                onChange={handleChange}
                className="px-2 py-1 border border-gray-400 rounded"
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
                className="px-2 py-1 border border-gray-400 rounded"
              />
            ) : (
              <p className="text-white">{user.currentSemester}</p>
            )}
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
             className="mt-4 ml-48 text-white font-semibold text-lg p-2 bg-[#EC4899] hover:bg-[#da2f84] rounded-md"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Academic Details Box */}
      <div className="px-10 p-10 w-2/3 rounded-lg bg-white mb-5 mt-5 border border-[#1a365d]">
        <div className="flex items-center">
          <IoBookOutline size={26} className="text-[#1a365d] mr-2" />
          <h2 className="text-xl font-bold text-[#1a365d]">Academic Details</h2>
        </div>
        <div className="grid md:grid-cols-2 grid-rows-1 gap-3 mt-5">
          <p className="text-sm text-[#1a365d] font-bold">CGPA</p>
          {isEditingAcademic ? (
            <input
              type="text"
              name="cgpa"
              value={user.cgpa || ""}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-400 rounded"
            />
          ) : (
            <p className="text-[#1a365d] p-1 border border-black rounded">{user.cgpa || "N/A"}</p>
          )}

          <p className="text-sm text-[#1a365d] font-bold">SGPA</p>
          {isEditingAcademic ? (
            <input
              type="text"
              name="sgpa"
              value={user.sgpa || ""}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-400 rounded"
            />
          ) : (
            <p className="text-[#1a365d] p-1 border border-black rounded">{user.sgpa || "N/A"}</p>
          )}

          <p className="text-sm text-[#1a365d] font-bold">Backlogs</p>
          {isEditingAcademic ? (
            <input
              type="text"
              name="backlogs"
              value={user.backlogs || ""}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-400 rounded"
            />
          ) : (
            <p className="text-[#1a365d] p-1 border border-black rounded">{user.backlogs || "N/A"}</p>
          )}

          <p className="text-sm text-[#1a365d] font-bold">Attendance</p>
          {isEditingAcademic ? (
            <input
              type="text"
              name="attendance"
              value={user.attendance || ""}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-400 rounded"
            />
          ) : (
            <p className="text-[#1a365d] p-1 border border-black rounded">{user.attendance || "N/A"}</p>
          )}
        </div>

        <button
          onClick={() => (isEditingAcademic ? handleSaveAcademic() : setIsEditingAcademic(true))}
           className="mt-4 ml-48 text-white font-semibold text-lg p-2 bg-[#EC4899] hover:bg-[#da2f84] rounded-md"
        >
          {isEditingAcademic ? "Save Changes" : "Edit Academic Details"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
