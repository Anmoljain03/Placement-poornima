import React, { useState, useEffect } from "react";
import { TbListSearch } from "react-icons/tb";
import { PiBuildingsDuotone } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { LuGraduationCap } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa";



const Jobs = () => {
  const [jobs, setJobs] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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
    fetchJobs();
  }, []);





  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job.jobTitle?.toLowerCase() || "";
    const companyName = job.companyName?.toLowerCase() || "";
    const location = job.jobLocation?.toLowerCase() || "";
  
 

    const searchLower = searchQuery.toLowerCase();

    // Split department & duration into an array
    const jobDepartment = job.department
        ?.split(",")
        .map(dep => dep.trim().toUpperCase()); // Convert to uppercase for case-insensitive comparison

    const jobDuration = job.duration
        ?.split(",")
        .map(dur => dur.trim().toUpperCase());

    // Matching department & duration filters
    const matchesDepartment = selectedDepartment === "All" || 
        jobDepartment?.includes(selectedDepartment.toUpperCase());

    const matchesDuration = selectedDuration === "All" || 
        jobDuration?.includes(selectedDuration.toUpperCase());

    // Match search query in various fields
    const matchesSearch = 
        jobTitle.includes(searchLower) ||
        companyName.includes(searchLower) ||
        location.includes(searchLower) 
        
       

    return matchesDepartment && matchesDuration && matchesSearch;
});

  
  return (
    <div className="bg-[#f8f9fa] m-0">
      <div className="pt-14 text-center text-2xl text-[#1A365D] font-bold">
        Campus Placement Portal
        <p className="text-[#4B5563] text-[15px] font-normal">
          Current Opportunities for 2024 Batch
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mt-16 ml-12 bg-white w-[93%] h-16 flex items-center gap-7 p-4 rounded-lg shadow-md">
        <div className="relative w-[65%]">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <TbListSearch size={23} />
          </span>
          <input 
            type="search" 
            className="h-10 w-full pl-10 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" 
            placeholder="Search Opportunities (Job Title, Company, Location)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Department Filter */}
        <select
          className="h-10 px-5 py-2 rounded-md  text-sm transition-shadow duration-100  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option className="bg-white hover:bg-red-400"  value="All">All Departments</option>
          <option value="BCA">BCA</option>
          <option value="BTECH">BTECH</option>
          <option value="BBA">BBA</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
          <option value="BVA">BVA</option>
          <option value="BSC">BSC</option>
        </select>

        <select
          className="h-10 px-5 py-2 rounded-md text-sm cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Internship">Internship</option>
          <option value="PPO Opportunity">PPO Opportunity</option>
         
          
        </select>
      </div>

     
     


      {/* Jobs Listing */}
      <div className="mt-8 ml-12 w-[93%]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="mb-6 p-6 bg-white rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-all flex justify-between items-center"
            >
              {/* Left Section */}
              <div>
                <h2 className="font-semibold text-lg">{job.jobTitle}</h2>
                <p className="text-gray-600 flex items-center">
                  <PiBuildingsDuotone className="h-4 w-4 mt-1 mr-1" />
                  {job.companyName}
                </p>
                <p className="text-sm text-gray-600 mt-2">{job.jobDescription}</p>

                {/* Job Details */}
                <p className="text-sm text-gray-800 font-medium mt-3 flex space-x-4">
                  {/* Salary */}
                  <span className="flex items-center space-x-1">
                    <MdCurrencyRupee className="text-lg text-gray-800" />
                    <span>{job.package}</span>
                  </span>

                  {/* Job Location */}
                  <span className="flex items-center space-x-1 text-gray-800">
                  <PiBuildingsDuotone className="h-4 w-4 mt-1 mr-1" />
                    <span>{job.jobLocation}</span>
                  </span>

                  {/* Department */}
                  <span className="flex items-center space-x-1 text-gray-800">
                    <LuGraduationCap className="text-lg" />
                    <span>{job.department}</span>
                  </span>

                  {/* Duration */}
                  <span className="flex items-center space-x-1 text-gray-800 bg-red-">
                    <IoIosTimer className="text-lg" />
                    <span>{job.duration}</span>
                  </span>
                </p>

                {/* Job Requirements */}
                <div className="mt-3 text-sm text-gray-700">
                  <strong>Requirements:</strong>
                  <ul className="list-disc ml-5">
                    {job.jobRequirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Application Deadline */}
                <div className="mt-3 text-sm text-red-600 flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-end">
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white w-26 h-10 pt-2 px-8 rounded-md bg-[#1A365D] font-medium hover:bg-gray-600 text-center"
                >
                  Apply Now
                </a>
                <p className="text-sm mt-3 px-3 py-1 bg-[#FCE7F3] rounded-full text-[#BE185D]"> 
                  {job.department}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No jobs available</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
