import React, { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { motion } from "framer-motion";
import { io } from 'socket.io-client';

const PlacementTracking = () => {
  const [user, setUser] = useState(null);
  const [placementStatus, setPlacementStatus] = useState([]);
  const [loadingPlacement, setLoadingPlacement] = useState(true);
  const [applications, setApplications] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);  // To store the number of applications

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setApplicationsCount(storedUser.applications || 0); // Set the number of applications from stored user data
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/auth/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      });

      if (!response.ok) {
        console.error("Failed to fetch user data:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("User data fetched:", data);

      // Ensure data has an _id field
      if (!data._id) {
        console.error("No _id field found in user data:", data);
        return;
      }

      setUser(data);
      setApplicationsCount(data.applications || 0);  // Set the number of applications
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  const socketRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("No User ID found, skipping data fetch.");
      return;
    }

    setLoadingPlacement(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, skipping data fetch.");
          return;
        }

        // ✅ Fetch Applications
        const applicationsRes = await fetch(
          `${import.meta.env.VITE_LIVE_URL}/api/admin/get-user-applications/${userId}`,
          {
            headers: { "Content-Type": "application/json", Authorization: token },
          }
        );

        if (!applicationsRes.ok) {
          throw new Error("Failed to fetch applications data");
        }

        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.applications);
        setApplicationsCount(applicationsData.applications.length);

        console.log("Applications API Response:", applicationsData);

        // ✅ Fetch Placement Tracking
        const placementRes = await fetch(
          `${import.meta.env.VITE_LIVE_URL}/api/jobs/placement-status/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (!placementRes.ok) {
          throw new Error(
            `Placement Tracking Fetch Error: ${placementRes.status} ${placementRes.statusText}`
          );
        }

        const placementData = await placementRes.json();
        console.log("Placement Tracking Data Fetched:", placementData);

        // ✅ Ensure placementData is an array
        if (!Array.isArray(placementData)) {
          console.error("Invalid placementData format:", placementData);
          return;
        }

        // ✅ Set Data Without Duplication
        setPlacementStatus(placementData);

        // ✅ Store in Local Storage
        localStorage.setItem("placementStatus", JSON.stringify(placementData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingPlacement(false);
      }
    };

    fetchData();
  }, []); // ✅ Runs only once

  return (
    <div>
      <div className="pt-14 bg-[#011e39] h-80 m-5 border rounded-2xl">
        <p className="text-5xl mb-3 text-center font-bold mt-6 text-white">My Applications</p>
        <p className="text-white text-[35px] w-[93%] mx-auto text-center  font-normal mb-3 ">(
          {applicationsCount} {applicationsCount === 1 ? '' : ''})
        </p>
      </div>



      <div className="px-8 py-8 w-full lg:w-3/4 mx-auto bg-gradient-to-r from-gray-100 to-gray-200 shadow-2xl rounded-lg mt-10 mb-10 overflow-hidden">
        {/* Header Section */}
        <motion.div
          className="flex items-center justify-start mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FaBriefcase size={32} className="text-[#1a365d]" />
          <h2 className="ml-4 text-3xl font-bold text-gray-800 tracking-wide">Placement Tracking Status</h2>
        </motion.div>

        {/* Table Section */}
        <motion.div
          className="overflow-x-auto w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {placementStatus && placementStatus.length > 0 ? (
            <div className="overflow-x-auto max-w-full">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-fixed">
                <thead className="bg-gradient-to-r from-[#243b53] to-[#486581] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left text-lg font-semibold">Company</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold">Job Title</th>
                    <th className="py-3 px-6 text-left text-lg font-semibold">Applied Date</th>
                    <th className="py-3 px-6 text-center text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {placementStatus.map((job, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <td className="py-4 px-6 text-gray-800">{job.companyName}</td>
                      <td className="py-4 px-6 text-gray-800">{job.jobTitle}</td>
                      <td className="py-4 px-6 text-gray-800">{new Date(job.createdAt).toLocaleDateString()}</td> {/* Applied Date */}
                      <td className="py-4 px-6 text-center">
                        <motion.p
                          className={`inline-block font-bold text-md px-4 py-2 rounded-md 
                      ${job.status === 'Completed' ? 'bg-green-100 text-green-600' :
                              job.status === 'Interview Scheduled' ? 'bg-blue-100 text-blue-600' :
                                'bg-orange-100 text-orange-600'}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {job.status}
                        </motion.p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-5 text-lg font-medium">No placement records found.</p>
          )}
        </motion.div>
      </div>

    </div>
  );
};

export default PlacementTracking;
