const express = require("express");
const { loginAdmin, getDashboardStats, updateUserStatus, scheduleInterview, getInterviews, getNotifications } = require("../controllers/adminController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// ✅ File Upload Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }); // Ensure `upload` is defined

router.post("/login", loginAdmin);
router.get("/dashboard", getDashboardStats);
router.post("/update-user-status", updateUserStatus);
// router.post("/schedule-interview", scheduleInterview);
router.get("/interviews", getInterviews);
router.get("/notifications/:userId", getNotifications);
router.post("/schedule-interview", upload.single("file"), scheduleInterview);
// ✅ Route should be a POST request
// router.post("/schedule-interview", upload.single("file"), scheduleInterview);

module.exports = router;
