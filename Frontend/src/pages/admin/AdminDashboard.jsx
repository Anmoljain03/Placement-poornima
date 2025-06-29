import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSun, FaMoon, FaWpforms } from "react-icons/fa";
import { motion } from "framer-motion";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Sidebar from "../../components/admin/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0 });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          showErrorToast("Admin not logged in!");
          navigate("/admin/login");
          return;
        }
    
        const response = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `${token}` },
        });
    
        if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    
        const data = await response.json();
        console.log("Dashboard Stats:", data); 
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
    fetchJobs();
  }, [navigate]);

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        showErrorToast("Admin not logged in!");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete job");
      showSuccessToast("Job deleted successfully!");
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      showErrorToast("Error deleting job: " + error.message);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} flex min-h-screen transition-all duration-300`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-gray-800 text-white hover:scale-110 transition"
              whileHover={{ rotate: 20 }}
            >
              {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
            </motion.button>

            <motion.button
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
                showSuccessToast("Logged out successfully");
              }}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transition"
            >
              <FaSignOutAlt /> Logout
            </motion.button>
          </div>
        </div>

        {/* Dashboard Stats with Gradient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[{ title: "Total Users", value: stats.totalUsers, color: "from-blue-500 to-indigo-600" },
            { title: "Total Jobs", value: stats.totalJobs, color: "from-green-500 to-emerald-600" },
            { title: "Total Applications", value: stats.totalApplications, color: "from-yellow-500 to-orange-600" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-r ${item.color} p-6 rounded-xl shadow-lg text-white flex flex-col items-center justify-between`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-4xl font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Manage Jobs Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Jobs</h2>

            <div className="flex gap-3">
              {/* Add Job Button */}
              <motion.button
                onClick={() => navigate("/admin/add-job")}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transition"
                whileHover={{ scale: 1.1 }}
              >
                <FaPlus /> Add Job
              </motion.button>

              {/* Create Job Form Button */}
              <motion.button
                onClick={() => navigate("/admin/create-job-form")}
                className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-md shadow-md hover:scale-105 transition"
                whileHover={{ scale: 1.1 }}
              >
                <FaWpforms /> Create Job Form
              </motion.button>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-4">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg text-left">
                <thead className="bg-gray-800 text-white">
                  <tr className="text-lg">
                    <th className="p-4">Job Title</th>
                    <th className="p-4">Company</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b hover:bg-gray-100">
                      <td className="p-4 text-black">{job.jobTitle}</td>
                      <td className="p-4 text-black">{job.companyName}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <button onClick={() => navigate(`/admin/edit-job/${job._id}`)} className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-1">
                          <FaEdit /> Edit
                        </button>
                        <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center gap-1">
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-4">No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
