import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const EditJob = () => {
  const { jobId } = useParams();  
  const navigate = useNavigate(); 

  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    jobLocation: "",
    package: "",
    jobDescription: "",
    jobRequirements: "",
    duration: "",
    department: "",
    applyLink: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch job details: ${response.status}`);
        }
        const data = await response.json();
        setJobData(data); 
      } catch (error) {
        console.error("Error fetching job:", error.message);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/jobs/edit/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"), 
        },
        body: JSON.stringify(jobData),
      });
  
      const responseData = await response.json();  // 👈 Yeh add kiya
      console.log("Backend Response:", responseData); // 👈 Backend ka response dekhne ke liye
  
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to update job");
      }
  
      showSuccessToast("Job Updated Successfully!");
      navigate("/admin/dashboard"); // ✅ Redirect to jobs list
    } catch (error) {
      console.error("Error updating job:", error);
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="jobTitle" placeholder="Job Title" className="border p-2 w-full" value={jobData.jobTitle} onChange={handleChange} />
        <input type="text" name="companyName" placeholder="Company Name" className="border p-2 w-full" value={jobData.companyName} onChange={handleChange} />
        <input type="text" name="jobLocation" placeholder="Job Location" className="border p-2 w-full" value={jobData.jobLocation} onChange={handleChange} />
        <input type="text" name="package" placeholder="Package" className="border p-2 w-full" value={jobData.package} onChange={handleChange} />
        <input type="text" name="duration" placeholder="Duration" className="border p-2 w-full" value={jobData.duration} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" className="border p-2 w-full" value={jobData.department} onChange={handleChange} />
        <input type="text" name="applyLink" placeholder="Apply Link" className="border p-2 w-full" value={jobData.applyLink} onChange={handleChange} />
        <input type="date" name="deadline" className="border p-2 w-full" value={jobData.deadline} onChange={handleChange} />
      </div>

      <textarea name="jobDescription" placeholder="Job Description" className="border p-2 w-full mt-3" value={jobData.jobDescription} onChange={handleChange} />
      <textarea name="jobRequirements" placeholder="Job Requirements" className="border p-2 w-full mt-3" value={jobData.jobRequirements} onChange={handleChange} />

      <button className="bg-blue-500 text-white px-4 py-2 mt-4 w-full" onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Job"}
      </button>
    </div>
  );
};

export default EditJob;
