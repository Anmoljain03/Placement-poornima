const express = require("express");
const jobController = require("../controllers/jobController");
const { authenticateAdmin } = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const { upload } = require("../controllers/jobController"); // Import Multer upload middleware

const router = express.Router();

// 🔹 Job Management Routes (Admin + User)
router.post("/", authenticateAdmin, upload.single("jobDescriptionFile"), jobController.postJob); 
router.get("/", jobController.getAllJobs); 
router.get("/:id", jobController.getJobById); 
router.put("/:id", authenticateAdmin, jobController.editJob); 
router.delete("/:id", authenticateAdmin, jobController.deleteJob); 

// 🔹 Job Application Routes (User Only)
router.post("/apply", authMiddleware, jobController.applyForJob); 
router.get("/applied/:userId", authMiddleware, jobController.getAppliedJobs);

// 🔹 Placement Tracking Routes (User + Admin)
router.get("/placement-status/:userId", authMiddleware, jobController.getPlacementStatus); 
router.put("/track/:userId", authenticateAdmin, jobController.updatePlacementStatus);

module.exports = router;
