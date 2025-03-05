import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
        const token = localStorage.getItem("token"); // ✅ Ensure token exists
        if (!token) {
            showErrorToast("Admin not logged in!");
            return;
        }

        const response = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, // ✅ Send token properly
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete job");
        }

        showSuccessToast("Job deleted successfully!");
        setJobs(jobs.filter((job) => job._id !== jobId)); // ✅ Update UI
    } catch (error) {
        console.error("Error deleting job:", error);
        showErrorToast("Error deleting job: " + error.message);
    }
};

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    showSuccessToast("Logout Successfully!");
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
              <li className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => navigate("/admin/add-job")}>
                Add Job
              </li>
            </ul>
          )}
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Users</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Reports</li>
        </ul>

        {/* Logout Button */}
        <button onClick={handleLogout}
                className="mt-5 p-2 bg-red-600 text-white rounded hover:bg-red-800 w-full">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-5">Welcome to Admin Panel</h1>

        {/* Job Listings */}
        <div className="mt-5">
          <h2 className="text-2xl font-bold mb-4">Manage Jobs</h2>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="border p-3 mb-3 rounded shadow">
                <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.companyName}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => navigate(`/admin/edit-job/${job._id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
