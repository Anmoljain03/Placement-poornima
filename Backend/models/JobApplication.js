const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    answers: { type: Array, required: true },
    status: { type: String, default: "Pending" }, // ✅ Ensure default is "Pending"
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
