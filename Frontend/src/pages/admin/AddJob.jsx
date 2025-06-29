import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../utils/toast";
import Sidebar from "../../components/admin/Sidebar";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const AddJob = () => {
  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    package: "",
    jobDescription: "",
    jobRequirements: [],
    duration: "",
    department: "",
    deadline: "",
  });

  const adminToken = localStorage.getItem("adminToken");
  const [requirement, setRequirement] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const addRequirement = () => {
    if (requirement.trim()) {
      setJob({ ...job, jobRequirements: [...job.jobRequirements, requirement] });
      setRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setJob({
      ...job,
      jobRequirements: job.jobRequirements.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("jobTitle", job.jobTitle);
    formData.append("companyName", job.companyName);
    formData.append("jobLocation", job.jobLocation);
    formData.append("package", job.package);
    formData.append("jobDescription", job.jobDescription || ""); // Ensure text field is sent
    formData.append("jobRequirements", JSON.stringify(job.jobRequirements));
    formData.append("duration", job.duration);
    formData.append("department", job.department);
    formData.append("deadline", job.deadline);

    if (selectedFile) {
      formData.append("jobDescriptionFile", selectedFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/jobs`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: adminToken, // ✅ No need to set "Content-Type" when using FormData
        },
      });


      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to post job");
      }

      showSuccessToast("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };



  return (
    <div className="flex min-h-screen bg-[#1F2937]">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-10"
      >
        <div className="bg-[#111827] shadow-2xl p-10 rounded-xl max-w-3xl w-full border border-gray-700">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-200">
            Add New Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Job Title & Company Name */}
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.jobTitle}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.companyName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Location & Package */}
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="jobLocation"
                placeholder="Job Location"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.jobLocation}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="package"
                placeholder="Package (e.g., 10 LPA)"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.package}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Description */}
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full h-36 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={job.jobDescription}
              onChange={handleChange}
              required
            ></textarea>

            {/* Job Requirements */}
            <div className="border p-4 rounded-lg bg-gray-900">
              <label className="font-semibold text-gray-300">Job Requirements</label>
              <div className="flex items-center mt-3 gap-3">
                <input
                  type="text"
                  placeholder="Add requirement (e.g., React, Node.js)"
                  className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  onClick={addRequirement}
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {job.jobRequirements.map((req, index) => (
                  <span key={index} className="bg-indigo-200 text-indigo-900 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {req}
                    <FaTimes
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => removeRequirement(index)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="border p-4 rounded-lg bg-gray-900 grid grid-cols-2 gap-6">
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.department}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="border p-4 rounded-lg bg-gray-900">
              <label className="font-semibold text-gray-300">Deadline</label>
              <input
                type="date"
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={job.deadline}
                onChange={handleChange}
                name="deadline"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Upload Job Description File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-600 bg-[#1F2937] text-gray-200 rounded-lg p-2 w-full"
                accept=".pdf,.doc,.docx"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 w-full rounded-lg hover:bg-indigo-700 text-lg font-semibold"
            >
              Add Job
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddJob;
