const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String, required: true },
    package: { type: String, required: true },
    jobDescription: { type: String, required: true },  
    jobRequirements: { type: [String], required: true },
    duration: { type: String, required: true },
    department: { type: String, required: true },
    applyLink: { type: String, required: true },
    postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;