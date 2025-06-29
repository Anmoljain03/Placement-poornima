
const mongoose = require("mongoose");

const PlacementTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: { 
    type: String, 
    enum: [
      "Pending",
      "Interview Scheduled",
      "1st Round Scheduled",
      "2nd Round Scheduled",
      "Final Round Scheduled",
      "Selected",
      "Rejected",
      "Completed"  // ✅ Add this
    ], 
    default: "Pending" 
  }
}, { timestamps: true });

module.exports = mongoose.model("PlacementTracking", PlacementTrackingSchema);
