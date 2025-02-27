const express = require("express");
const { postJob, getAllJobs, editJob, deleteJob, getJobById } = require("../controllers/jobController");
const { authenticateAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// ✅ Post a new job (Admin Only)
router.post("/post-job", authenticateAdmin, postJob);

// ✅ Get all jobs (Accessible by Users)
router.get("/", getAllJobs);

// ✅ Get a single job by ID (Accessible by Users)
router.get("/:id", getJobById); 

// ✅ Edit job details (Admin Only)
router.put("/edit/:id", authenticateAdmin, editJob);

// ✅ Delete a job (Admin Only)
router.delete("/delete/:jobId", authenticateAdmin, deleteJob);

module.exports = router;
