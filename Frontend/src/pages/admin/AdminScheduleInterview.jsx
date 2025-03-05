import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const AdminScheduleInterview = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [file, setFile] = useState(null); // State for selected file
  const [interviewDetails, setInterviewDetails] = useState({
    company: "",
    interviewerEmail: "",
    interviewDate: "",
    interviewTime: "",
    location: "",
    interviewLink: "",
  });

  useEffect(() => {
    // Fetch all jobs
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        showErrorToast("Failed to load jobs.");
      }
    };

    fetchJobs();
  }, []);

  // Update company name when job is selected
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

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
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
        formData.append("file", file); // Attach the file
      }

      const response = await fetch("http://localhost:5000/api/admin/schedule-interview", {
        method: "POST",
        body: formData, // Use FormData to send file
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to schedule interview");
      }

      showSuccessToast("Interview scheduled & notifications sent!");
    } catch (error) {
      console.error("Error scheduling interview:", error);
      showErrorToast(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Schedule Interview</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        {/* Job Selection */}
        <label className="block font-semibold mb-2">Select Job:</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select a job</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.jobTitle} - {job.companyName}
            </option>
          ))}
        </select>

        {/* Company Name (Auto-filled) */}
        <label className="block font-semibold mb-2">Company:</label>
        <input
          type="text"
          value={interviewDetails.company}
          readOnly
          className="w-full p-2 border rounded mb-4 bg-gray-200"
        />

        {/* Interviewer Email */}
        <label className="block font-semibold mb-2">Interviewer Email:</label>
        <input
          type="email"
          value={interviewDetails.interviewerEmail}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewerEmail: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          placeholder="Interviewer Email"
        />

        {/* Interview Date */}
        <label className="block font-semibold mb-2">Date:</label>
        <input
          type="date"
          value={interviewDetails.interviewDate}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewDate: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Interview Time */}
        <label className="block font-semibold mb-2">Time:</label>
        <input
          type="time"
          value={interviewDetails.interviewTime}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewTime: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Interview Location */}
        <label className="block font-semibold mb-2">Location:</label>
        <input
          type="text"
          value={interviewDetails.location}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, location: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          placeholder="Online or Physical Location"
        />

        {/* Meeting Link (Optional) */}
        <label className="block font-semibold mb-2">Meeting Link (If Online):</label>
        <input
          type="text"
          value={interviewDetails.interviewLink}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewLink: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g., Zoom/Google Meet Link"
        />

        {/* File Upload for Selected Students */}
        <label className="block font-semibold mb-2">Upload Selected Students List (PDF/CSV):</label>
        <input
          type="file"
          accept=".pdf,.csv"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-800">
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default AdminScheduleInterview;
