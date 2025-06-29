import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { showSuccessToast } from '../../utils/toast';

const Sidebar = () => {
  const [interviewOpen, setInterviewOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
    showSuccessToast("Logged out successfully");
  };

  return (
    <motion.div 
      initial={{ x: -250, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-72 bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 min-h-screen shadow-xl"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 text-center tracking-wide"
      >
        Admin Panel
      </motion.h2>

      <ul className="space-y-4">
        {/* Dashboard */}
        <motion.li
          onClick={() => navigate("/admin/dashboard")}
          whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gray-800 rounded-md transition-all duration-300 cursor-pointer"
        >
          🏠 Dashboard
        </motion.li>

        {/* Interview Dropdown - Improved Alignment */}
        <div className="relative">
          <motion.div
            onClick={() => setInterviewOpen(!interviewOpen)}
            whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
            className="p-3 bg-gray-800 rounded-md flex items-center justify-between transition-all duration-300 cursor-pointer"
          >
            📅 Interview
            {interviewOpen ? <FaChevronDown /> : <FaChevronRight />}
          </motion.div>

          {/* Dropdown Menu - Now pushes content down */}
          <AnimatePresence>
            {interviewOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mt-2 pl-4"
              >
                <motion.li
                  onClick={() => navigate("/admin/schedule-interview")}
                  whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
                  className="p-3 bg-gray-700 rounded-md transition-all duration-300 cursor-pointer"
                >
                  📌 Schedule Interview
                </motion.li>
                <motion.li
                  onClick={() => navigate("/admin/scheduled-interviews")}
                  whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
                  className="p-3 bg-gray-700 rounded-md transition-all duration-300 cursor-pointer"
                >
                  📜 Scheduled Interviews  <span className="flex justify-center">List</span>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Applications - No Overlap Now */}
        <motion.li
          onClick={() => navigate("/admin/applications")}
          whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gray-800 rounded-md transition-all duration-300 cursor-pointer"
        >
          📂 Applications
        </motion.li>

        {/* Users */}
        <motion.li
          onClick={() => navigate("/admin/users")}
          whileHover={{ scale: 1.05, backgroundColor: "#4B5563" }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gray-800 rounded-md transition-all duration-300 cursor-pointer"
        >
          👥 Users
        </motion.li>
      </ul>

   
    </motion.div>
  );
};

export default Sidebar;
