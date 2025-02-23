const Job = require("../models/Jobs");

// Admin posting a single job
const postJob = async (req, res) => {
    try {
        const { jobTitle, companyName, jobLocation, package, jobDescription, jobRequirements, duration, department, applyLink } = req.body;

        const newJob = new Job({
            jobTitle,
            companyName,
            jobLocation,
            package,
            jobDescription,
            jobRequirements,
            duration,
            department,
            applyLink,
        });

        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error posting job" });
    }
};

// Fetch all jobs for users
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching jobs" });
    }
};

module.exports = { postJob, getJobs };
