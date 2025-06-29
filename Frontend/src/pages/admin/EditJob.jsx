import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import Sidebar from "../../components/admin/Sidebar";
import { FaTimes } from "react-icons/fa";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    package: "",
    jobDescription: "",
    jobRequirements: [],
    duration: "",
    department: "",
    applyLink: "",
    deadline: "",
  });

  const [requirement, setRequirement] = useState("");

  // Fetch job data for editing
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const data = await response.json();
        if (response.ok) {
          setJob(data);
        } else {
          showErrorToast("Error fetching job details!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        showErrorToast("Error fetching job: " + error.message);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
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
    const token = localStorage.getItem("token");
    if (!token) {
      showErrorToast("Admin not logged in!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/edit/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(job),
      });

      const data = await response.json();
      if (response.ok) {
        showSuccessToast("Job Updated Successfully!");
        navigate("/admin/dashboard");
      } else {
        showErrorToast("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      showErrorToast("Error updating job: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white shadow-xl p-8 rounded-lg max-w-2xl w-full relative border border-gray-200 transition-all hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-700 animate-fade-in">
            Edit Job
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                className="input-field"
                value={job.jobTitle}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                className="input-field"
                value={job.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="jobLocation"
                placeholder="Job Location"
                className="input-field"
                value={job.jobLocation}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="package"
                placeholder="Package (e.g., 10 LPA)"
                className="input-field"
                value={job.package}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="jobDescription"
              placeholder="Job Description"
              className="input-field h-28"
              value={job.jobDescription}
              onChange={handleChange}
              required
            ></textarea>

            {/* Job Requirements Input */}
            <div className="border p-3 rounded-md bg-gray-50">
              <label className="font-semibold text-gray-600">Job Requirements</label>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder="Add requirement (e.g., Node.js, React)"
                  className="input-field w-full"
                  value={requirement}
                  onChange={handleRequirementChange}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-2 ml-2 rounded-md hover:bg-blue-600 transition-all"
                  onClick={addRequirement}
                >
                  Add
                </button>
              </div>

              {/* Display added requirements */}
              <div className="mt-3 flex flex-wrap gap-2">
                {job.jobRequirements.map((req, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center gap-2"
                  >
                    {req}
                    <FaTimes
                      className="cursor-pointer text-red-600 hover:text-red-800 transition-all"
                      onClick={() => removeRequirement(index)}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., Full-time, Internship)"
                className="input-field"
                value={job.duration}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="department"
                placeholder="Department (e.g., BCA, BTECH)"
                className="input-field"
                value={job.department}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="url"
              name="applyLink"
              placeholder="Application Link"
              className="input-field"
              value={job.applyLink}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="deadline"
              className="input-field"
              value={job.deadline}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-green-500 text-white px-5 py-3 w-full rounded-md hover:bg-green-600 transition-all"
            >
              Update Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
