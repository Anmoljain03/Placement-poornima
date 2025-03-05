import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

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
    applyLink: "",
    deadline: "",
  });

  const navigate = useNavigate();

  const [requirement, setRequirement] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  };

  const addRequirement = () => {
    if (requirement.trim()) {
      setJob({ ...job, jobRequirements: [...job.jobRequirements, requirement] });
      setRequirement(""); // Clear input after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ Admin token fetch kiya
    if (!token) {
       showErrorToast("Admin not logged in!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/jobs/post-job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token, 
            },
            body: JSON.stringify(job),
        });

        const data = await response.json();
        if (response.ok) {
            showSuccessToast("Job Added Successfully!");
            navigate("/admin/dashboard");
            setJob({
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
            
        } else {
            showErrorToast("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error adding job:", error);
        showErrorToast("Error adding job: " + error.message);
    }
};

  return (
    <div className="border p-5 bg-white shadow-md rounded-md w-full max-w-lg mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4 text-center">Add Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          className="border p-2 w-full"
          value={job.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          className="border p-2 w-full"
          value={job.companyName}
          onChange={handleChange}
          required      
        />
        <input
          type="text"
          name="jobLocation"
          placeholder="Job Location"
          className="border p-2 w-full"
          value={job.jobLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="package"
          placeholder="Package (e.g., 10 LPA)"
          className="border p-2 w-full"
          value={job.package}
          onChange={handleChange}
          required
        />
        <textarea
          name="jobDescription"
          placeholder="Job Description"
          className="border p-2 w-full"
          value={job.jobDescription}
          onChange={handleChange}
          required
        ></textarea>

        {/* Job Requirements Input */}
        <div className="border p-3 rounded-md">
          <label className="font-semibold">Job Requirements</label>
          <div className="flex items-center mt-2">
            <input
              type="text"
              placeholder="Add requirement (e.g., Node.js, React)"
              className="border p-2 w-full"
              value={requirement}
              onChange={handleRequirementChange}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-2 ml-2 rounded-md hover:bg-blue-600 transition"
              onClick={addRequirement}
            >
              Add
            </button>
          </div>
          {/* Display added requirements */}
          <div className="mt-2">
            {job.jobRequirements.map((req, index) => (
              <span key={index} className="bg-gray-200 text-sm p-1 rounded-md mr-2">
                {req}
              </span>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., Full-time, Internship)"
          className="border p-2 w-full"
          value={job.duration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department (e.g., BCA, BTECH)"
          className="border p-2 w-full"
          value={job.department}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="applyLink"
          placeholder="Application Link"
          className="border p-2 w-full"
          value={job.applyLink}
          onChange={handleChange}
          required
        />

        {/* Application Deadline */}
        <input
          type="date"
          name="deadline"
          className="border p-2 w-full"
          value={job.deadline}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 w-full rounded-md hover:bg-green-600 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
