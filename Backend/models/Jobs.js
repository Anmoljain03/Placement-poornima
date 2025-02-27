const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  jobLocation: { type: String, required: true },
  package: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobRequirements: { type: [String], required: true }, // Array of job requirements
  department: { type: String, required: true },
  duration: { type: String, required: true }, // Job duration (e.g., "6 months", "Full-time")
  deadline: { type: Date, required: true }, // Application deadline
  applyLink: { type: String, required: true },
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
