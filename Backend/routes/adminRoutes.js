const express = require("express");
const {
  loginAdmin,
  getDashboardStats,
  updateUserStatus,
  scheduleInterview,
  getInterviews,
  getNotifications,
  getAllUsers,
  toggleFeePaid,
  createJobForm,
  getJobForm,
  submitJobApplication,
  getUserApplications,
  getAllApplications,
  getScheduledInterviews
} = require("../controllers/adminController");

const multer = require("multer");
const path = require("path");

const router = express.Router();

// File Upload Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Admin Routes
router.post("/login", loginAdmin);
router.get("/dashboard", getDashboardStats);
router.post("/update-user-status", updateUserStatus);
router.post("/schedule-interview", upload.single("file"), scheduleInterview);
router.get("/interviews", getInterviews);
router.get("/notifications/:userId", getNotifications);
router.get("/users", getAllUsers);
router.patch("/users/:userId/toggle-fee-paid", toggleFeePaid);

//  Job Application Form Routes
router.post("/create-job-form", createJobForm);
router.get("/get-job-form/:jobId", getJobForm);

router.post("/submit-job-application", submitJobApplication);
router.get("/get-user-applications/:userId", getUserApplications);
router.get("/scheduled-interviews", getScheduledInterviews);

router.get("/applications", getAllApplications);

module.exports = router;