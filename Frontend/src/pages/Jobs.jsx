import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbListSearch } from "react-icons/tb";
import { PiBuildingsDuotone } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { IoIosTimer } from "react-icons/io";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState("All");
  const [selectedDurations, setSelectedDurations] = useState("All");
  const [isDeptOpen, setIsDeptOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [feePaid, setFeePaid] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]); 
  const [sortBy, setSortBy] = useState("Recommended");
  console.log("Jobs Data:", jobs);

  const department = ["BCA", "BTech", "MCA", "MBA","BBA"];
  const duration = ["Full Time", "Part Time", "Internship"];

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };


    

    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user details");

        const userData = await res.json();
        setFeePaid(userData.feePaid);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchJobs();
    fetchUserDetails();
  }, []);

  const handleApplyClick = async (jobId) => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User ID not found. Ensure the user is logged in.");
      return;
    }
  
    console.log("Applying for job with User ID:", userId);
  
    await applyForJob(userId, jobId);
  };
  
  

  const applyForJob = async (userId, jobId) => {
    if (!userId) {
        console.error(" User ID is missing!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/jobs/apply`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ userId, jobId }),
        });

        const data = await response.json();
        console.log("Job Application Response:", data);

        if (response.ok) {
            alert("Application Submitted!");
        } else {
            console.error("Error submitting application:", data.message);
        }
    } catch (error) {
        console.error("API Call Error:", error);
    }
};

useEffect(() => {
  fetch(`http://localhost:5000/api/jobs/applied/${userId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched applied jobs:", data);
      setAppliedJobs(data.applications.map((app) => app.jobId)); // ✅ Extract job IDs
    })
    .catch((err) => console.error("Error fetching applied jobs:", err));
}, [userId]);


const isDeadlinePassed = (deadline) => {
  const currentDate = new Date();
  const jobDeadline = new Date(deadline);
  return currentDate > jobDeadline;
};

// dropdown checkbox filter

  //  **Filter Jobs Based on Search & Dropdowns**
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    const jobTitle = job.jobTitle?.toLowerCase() || "";
    const companyName = job.companyName?.toLowerCase() || "";
    const location = job.jobLocation?.toLowerCase() || "";
  
    // 🔹 Condition: Search Query Matching (Job Title, Company, Location)
    const matchesSearch = jobTitle.includes(query) || companyName.includes(query) || location.includes(query);
  
    // 🔹 Ensure selectedDepartments & selectedDurations are arrays
    const selectedDeptArray = Array.isArray(selectedDepartments) ? selectedDepartments : [];
    const selectedDurArray = Array.isArray(selectedDurations) ? selectedDurations : [];
  
    // 🔹 Convert job's department and duration into arrays for comparison
    const jobDeptArray = job.department ? job.department.split(",").map((d) => d.trim().toUpperCase()) : [];
    const jobDurArray = job.duration ? job.duration.split(",").map((d) => d.trim().toUpperCase()) : [];
  
    // 🔹 Condition: Department Matching (Should match at least one selected department)
    const matchesDepartment =
      selectedDeptArray.length === 0 ||
      selectedDeptArray.some((dept) => jobDeptArray.includes(dept.toUpperCase()));
  
    // 🔹 Condition: Duration Matching (Should match at least one selected duration)
    const matchesDuration =
      selectedDurArray.length === 0 ||
      selectedDurArray.some((dur) => jobDurArray.includes(dur.toUpperCase()));
  
    // 🔹 Return only jobs that match **both** department & duration conditions
    return matchesSearch && matchesDepartment && matchesDuration;
  });
  
  console.log("Filtered Jobs:", filteredJobs);


// Handle sorting change
const handleSortChange = (event) => {
  setSortBy(event.target.value);
  if (event.target.value === "Date Posted") {
      setJobs([...jobs].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)));
  }
};

const clearFilters = () => {
  setSelectedDurations([]);
  setSelectedDepartments([]);
};


    // ✅ Checkbox handle function
    const handleDepartmentChange = (dept) => {
      setSelectedDepartments((prev) =>
        prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
      );
    };
    
    const handleDurationChange = (dur) => {
      setSelectedDurations((prev) =>
        prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
      );
    };


  return (
<div className="bg-[#f8f9fa] min-h-screen flex flex-col">
      <div className="pt-16 bg-[#011e39] md:h-96 mx-2 md:mx-5 mt-2 border rounded-2xl px-4">
        <motion.p
          className="text-2xl sm:text-4xl md:text-5xl text-center font-bold text-white mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Search Your Dream <br /> Job Which You Deserve
        </motion.p>
        <p className="text-white text-sm sm:text-lg md:text-xl text-center mt-4">
          Current Opportunities for 2024 Batch
        </p>

        {!feePaid && (
          <motion.div
            className="mt-5 bg-red-100 text-red-700 py-3 px-5 rounded-md w-full max-w-[600px] mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You cannot apply for jobs because your fee status is <b>unpaid</b>. Please contact the administration.
          </motion.div>
        )}

        <motion.div
          className="mt-28 bg-white max-w-[700px] mx-auto flex items-center gap-4 p-4 rounded-lg shadow-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <FaSearch className="text-gray-700" />
          <input
            type="text"
            className="flex-1 border-none outline-none text-gray-700 placeholder-gray-400"
            placeholder="Search Job"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        <p className="text-center mt-3 text-sm font-medium text-[#333030]">
          Explore: Job Location, Job Title, Company Name
        </p>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 ml-4 mt-16">
            <button className="border border-gray-500 px-4 py-2 font-medium rounded flex items-center">
              <span className="mr-2">⚙️</span> All Filters
            </button>
            <button
              onClick={clearFilters}
              className="border border-gray-500 px-4 py-2 font-medium rounded flex items-center"
            >
              <span className="mr-2 text-[#033f94]">❌</span> Clear Filters
            </button>
            <select
              className="border border-gray-500 px-4 py-2 rounded"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="Recommended">Recommended</option>
              <option value="Date Posted">Date Posted</option>
            </select>
          </div>
        </div>
      

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-10 mt-10 mb-10">
        {/* Filters Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#011e39] text-white rounded-lg p-4 shadow-md sticky top-4">
            {/* Department */}
            <div className="w-full mb-4 ">
              <button
                onClick={() => setIsDeptOpen(!isDeptOpen)}
                className="flex justify-between items-center w-full p-2 border-b"
              >
                <span>Departments</span>
                {isDeptOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isDeptOpen && (
                <div className="overflow-y-scroll max-h-40 slim-scroll mt-2">
                  {department.map((dept) => (
                    <label key={dept} className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        value={dept}
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => handleDepartmentChange(dept)}
                      />
                      {dept}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Duration */}
            <div className="w-full">
              <button
                onClick={() => setIsDurationOpen(!isDurationOpen)}
                className="flex justify-between items-center w-full p-2 border-b"
              >
                <span>Duration</span>
                {isDurationOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isDurationOpen && (
                <div className="max-h-40 overflow-y-auto mt-2">
                  {duration.map((dur) => (
                    <label key={dur} className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        value={dur}
                        checked={selectedDurations.includes(dur)}
                        onChange={() => handleDurationChange(dur)}
                      />
                      {dur}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                className="bg-white rounded-2xl p-4 shadow-md border transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-bold text-gray-900">{job.jobTitle}</h2>
                <p className="text-gray-700 text-sm flex items-center">
                  <PiBuildingsDuotone className="mr-2 text-blue-500" /> {job.companyName}
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-gray-700 text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <MdCurrencyRupee className="text-gray-700" />
                    {job.package}
                  </span>
                  <span className="flex items-center gap-1">
                    <PiBuildingsDuotone className="text-gray-700" />
                    {job.jobLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <LuGraduationCap className="text-gray-700" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoIosTimer className="text-gray-700" />
                    {job.duration}
                  </span>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <strong>Description:</strong>
                  <p>{job.jobDescription}</p>
                </div>

                {job.fileUrl && (
                  <div className="mt-2 text-sm">
                    <strong>Job Description File:</strong>
                    <a
                      href={job.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 mt-1"
                    >
                      <FaFilePdf className="text-red-500" /> Download
                    </a>
                  </div>
                )}

                <div className="mt-2 text-sm text-red-600 flex items-center">
                  <FaCalendarAlt className="mr-2 text-lg" />
                  <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                </div>

                <div className="mt-4">
                  <motion.button
                    disabled={!feePaid || appliedJobs.includes(job._id) || isDeadlinePassed(job.deadline)}
                    onClick={() => navigate(`/apply/${job._id}`)}
                    whileHover={{ scale: !feePaid || isDeadlinePassed(job.deadline) || appliedJobs.includes(job._id) ? 1 : 1.05 }}
                    className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                      !feePaid || isDeadlinePassed(job.deadline) || appliedJobs.includes(job._id)
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-[#1a365d] text-white hover:bg-[#3b5069]"
                    }`}
                  >
                    {isDeadlinePassed(job.deadline)
                      ? "Deadline Passed"
                      : appliedJobs.includes(job._id)
                      ? "Applied"
                      : "Apply Now"}
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-[#1a365d]">No jobs available</p>
          )}
        </div>
      </div>
      </div>
     
  );
};

export default Jobs;         