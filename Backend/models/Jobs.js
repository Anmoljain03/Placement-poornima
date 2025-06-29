const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String, required: true },
    package: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobRequirements: { type: [String], required: true },
    department: { type: String, required: true },
    duration: { type: String, required: true },
    deadline: { type: Date, required: true },
    applyLink: { type: String,},
    status: { type: String, enum: ["Pending", "Interview Scheduled"], default: "Pending" },
    jobDescriptionFile: { type: String }, 
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
