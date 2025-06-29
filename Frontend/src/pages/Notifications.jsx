import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaSearch } from "react-icons/fa";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("❌ User ID not found in localStorage");
        setError("User ID not found");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/notifications/${userId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch notifications");
        }
  
        const data = await response.json();
        console.log("✅ Notifications Fetched:", data);
        setNotifications(data);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, []);
  

  const filteredNotifications = notifications.filter((n) =>
    n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaBell /> Notifications
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:ring focus:ring-blue-300 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {!loading && !error && filteredNotifications.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No notifications found.</p>
        )}

        <AnimatePresence>
          <ul className="mt-5 space-y-4">
            {filteredNotifications.map((notification) => (
              <motion.li
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-300 border-blue-500 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <p className="text-[#242424] font-medium">{notification.message}</p>

                {notification.interviewLink && (
                  <a
                    href={notification.interviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-[#242424] hover:underline"
                  >
                    ➡ Join Interview
                  </a>
                )}

                {notification.file && (
                  <a
                    href={notification.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-[#242424] hover:underline"
                  >
                    📄 View File
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Notifications;