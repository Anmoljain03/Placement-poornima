const express = require("express");
const { postJob, getJobs } = require("../controllers/jobController");

const router = express.Router();

// for posting job by admin
router.post("/post-job", postJob);

// for getting jobs by user
router.get("/jobs", getJobs);

module.exports = router;
