const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  interviewerEmail: { type: String, required: true },
  interviewDate: { type: String, required: true },
  interviewTime: { type: String, required: true },
  location: { type: String },
  interviewLink: { type: String },
  file: { type: String }, // ✅ Store file path or name
});

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
