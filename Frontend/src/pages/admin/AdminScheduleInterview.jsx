import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Sidebar from "../../components/admin/Sidebar";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminScheduleInterview = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [file, setFile] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    company: "",
    interviewerEmail: "",
    interviewDate: "",
    interviewTime: "",
    location: "",
    interviewLink: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        showErrorToast("Failed to load jobs.");
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      const selectedJobData = jobs.find((job) => job._id === selectedJob);
      if (selectedJobData) {
        setInterviewDetails((prevDetails) => ({
          ...prevDetails,
          company: selectedJobData.companyName,
        }));
      }
    }
  }, [selectedJob, jobs]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) {
      showErrorToast("Please select a job.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobId", selectedJob);
      formData.append("interviewerEmail", interviewDetails.interviewerEmail);
      formData.append("interviewDate", interviewDetails.interviewDate);
      formData.append("interviewTime", interviewDetails.interviewTime);
      formData.append("location", interviewDetails.location);
      formData.append("interviewLink", interviewDetails.interviewLink);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch("http://localhost:5000/api/admin/schedule-interview", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to schedule interview");
      }

      showSuccessToast("Interview scheduled successfully!");
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <motion.div
        className="flex-1 flex items-center justify-center p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-[#374151] shadow-xl p-8 rounded-lg max-w-2xl w-full border border-gray-500 transition-all hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Schedule Interview
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select Job */}
            <div>
              <label className="font-semibold text-gray-300">Select Job:</label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select a job</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.jobTitle} - {job.companyName}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="font-semibold text-gray-300">Company:</label>
              <input
                type="text"
                value={interviewDetails.company}
                readOnly
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md"
              />
            </div>

            {/* Interviewer Email */}
            <div>
              <label className="font-semibold text-gray-300">Interviewer Email:</label>
              <input
                type="email"
                value={interviewDetails.interviewerEmail}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewerEmail: e.target.value })}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Interviewer Email"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-300">Date:</label>
                <input
                  type="date"
                  value={interviewDetails.interviewDate}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-300">Time:</label>
                <input
                  type="time"
                  value={interviewDetails.interviewTime}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="font-semibold text-gray-300">Location:</label>
              <input
                type="text"
                value={interviewDetails.location}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, location: e.target.value })}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Online or Physical Location"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-300">Interview Link:</label>
              <input
                type="text"
                value={interviewDetails.interviewLink}
                onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewLink: e.target.value })}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Interview Link"
              />
            </div>

            {/* Upload File */}
            <div className="border p-3 rounded-md bg-gray-700">
              <label className="font-semibold text-gray-300">Upload Selected Students List:</label>
              <div className="flex items-center mt-2">
                <input type="file" accept=".pdf,.csv" onChange={handleFileChange} className="hidden" id="fileUpload" />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-all"
                >
                  <FaUpload /> {file ? file.name : "Choose File"}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="bg-green-500 text-white px-5 py-3 w-full rounded-md hover:bg-green-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Interview
            </motion.button>
          </form>
         
        </div>
      </motion.div>
    </div>
  );
};

export default AdminScheduleInterview;
