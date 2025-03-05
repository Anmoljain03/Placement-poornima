import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0 });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
      if (!token) {
        showErrorToast("Admin not logged in!");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    showSuccessToast("Logged out successfully");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 min-h-screen">
        <h2 className="text-xl font-semibold mb-5">Admin Panel</h2>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => setJobsOpen(!jobsOpen)}>
            <span>Jobs</span>
            {jobsOpen ? <FaChevronDown /> : <FaChevronRight />}
          </li>
          {jobsOpen && (
            <ul className="ml-5 space-y-1">
              <li className="p-2 hover:bg-gray-600 cursor-pointer" onClick={() => navigate("/admin/add-job")}>
                Add Job
              </li>
            </ul>
          )}
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Users</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/admin/schedule-interview")}>
  Schedule Interview
</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Notifications</li>
        </ul>
        {/* Logout Button */}
        <button onClick={handleLogout} className="mt-5 p-2 bg-red-600 text-white rounded hover:bg-red-800 w-full">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-5">Welcome to Admin Panel</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-5 bg-blue-500 text-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="p-5 bg-green-500 text-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Jobs</h3>
            <p className="text-2xl font-bold">{stats.totalJobs}</p>
          </div>
          <div className="p-5 bg-yellow-500 text-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Applications</h3>
            <p className="text-2xl font-bold">{stats.totalApplications}</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>
          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Job Title</th>
                  <th className="border p-2">Company</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border">
                    <td className="border p-2">{job.jobTitle}</td>
                    <td className="border p-2">{job.companyName}</td>
                    <td className="border p-2">
                      <button onClick={() => navigate(`/admin/edit-job/${job._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-3 py-1 rounded ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
