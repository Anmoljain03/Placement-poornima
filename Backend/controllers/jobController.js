const Job = require("../models/Jobs");

// ✅ Admin posting a new job
const postJob = async (req, res) => {
    try {
        const requiredFields = [
            "jobTitle",
            "companyName",
            "jobLocation",
            "package",
            "jobDescription",
            "jobRequirements",
            "duration",
            "department",
            "applyLink",
            "deadline",
        ];

        // ✅ Check for missing required fields
        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
        }

        // ✅ Create & Save new job
        const newJob = new Job(req.body);
        await newJob.save();

        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get a single job by ID
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "Job ID is required" });

        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Edit job (Admin only) - Ensures existing fields are not erased
const editJob = async (req, res) => {
    console.log("Edit Job Request Received:", req.body); // 👈 Check incoming data
    console.log("Job ID:", req.params.id); // 👈 Check Job ID
  
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error("Error updating job:", error); // 👈 Backend me error print hoga
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  
// ✅ Delete job (Admin only)
const deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params; // Ensure correct param name

        if (!jobId) {
            return res.status(400).json({ error: "Job ID is required" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        await Job.findByIdAndDelete(jobId);
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { postJob, getAllJobs, getJobById, editJob, deleteJob };
