import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage
      if (!userId) {
        setError("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/notifications/${userId}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: Expected an array");
        }

        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>

      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && notifications.length === 0 && (
        <p>No new notifications.</p>
      )}

      {!loading && !error && notifications.length > 0 && (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="mb-2 p-3 border rounded-md">
              <p>{notification.message}</p>

              {/* Interview Link (Fixed Field Name) */}

              {notification.interviewLink && (
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-700">Interview Link:</h3>
                  <a
                    href={notification.interviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-semibold block mt-1"
                  >
                    ➡ Join Interview
                  </a>
                </div>
              )}

              {/* File Attachment (Fixed Field Name) */}
              
              {notification.file && (
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-700">File Attachment:</h3>
                <a
                  href={notification.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 font-semibold block mt-1"
                >
                  📄 View File
                </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
