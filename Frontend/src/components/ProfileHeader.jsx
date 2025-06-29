import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          const updatedUser = {
            name: data.name || "",
            email: data.email || "",
            registrationNumber: data.registrationNumber || "",
            department: data.department || "",
            profileImage: data.profileImage || null,
            academicYear: data.academicYear || "",
            cgpa: data.cgpa || "",
            backlogs: data.backlogs || "",
            attendance: data.attendance || "",
          };

          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setApplications(data.applications || 0);
          setNotifications(data.notifications || 0);

          // Set profile image preview if available
          if (data.profileImage) {
            setImagePreview(data.profileImage);
          }

          // Calculate profile completion
          calculateProfileCompletion(updatedUser);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  // Function to calculate profile completion percentage
  const calculateProfileCompletion = (userData) => {
    let filledFields = 0;
    if (userData.profileImage) filledFields++;
    if (userData.cgpa) filledFields++;
    if (userData.academicYear) filledFields++;
    if (userData.backlogs) filledFields++;
    if (userData.attendance) filledFields++;

    const completionPercentage = (filledFields / 5) * 100;
    setProfileCompletion(completionPercentage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };
      calculateProfileCompletion(updatedUser);
      return updatedUser;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleProfileImageClick = () => {
    document.getElementById("imageInput").click();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#243b53] to-[#3a4957] p-6 h-76 w-[90%] m-auto rounded-lg shadow-lg text-white">
      <div className="flex items-center space-x-6">
        {/* Profile Image with Camera Icon */}
        <div
          className="relative w-28 h-28 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden"
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
        <div className="flex-1">
          <h2 className="text-3xl font-bold mt-1">{user.name}</h2>
          <p className="text-xl">{user.department}</p>
          <p className="text-lg mt-1 text-gray-300">{user.email}</p>
        </div>

        {/* Profile Completion Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white/10 border border-white/20 rounded-lg p-4 w-76 shadow-sm"
        >
          <span className="text-white text-lg font-medium">Complete Your Profile</span>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full">
              <circle cx="50%" cy="50%" r="28" strokeWidth="4" stroke="#e5e7eb" fill="transparent" />
              <circle
                cx="50%"
                cy="50%"
                r="28"
                strokeWidth="4"
                stroke="teal"
                fill="transparent"
                strokeDasharray="113"
                strokeDashoffset={113 - (profileCompletion / 100) * 113}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
              {profileCompletion}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Applications & Notifications Section */}
      <div className="mt-16 flex space-x-4">
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-center hover:bg-white/20">
          <p className="text-lg font-semibold">{applications}</p>
          <p className="text-sm">Applications</p>
        </div>
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-center hover:bg-white/20">
          <p className="text-lg font-semibold">{notifications}</p>
          <p className="text-sm">Notifications</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
