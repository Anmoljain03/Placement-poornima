const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/user");  
const Job = require("../models/Jobs");
const Interview = require("../models/interviewModel");
const Notification = require("../models/Notification");
const secretKey = "Poornima-Placement";

//admin credentials
const ADMIN_CREDENTIALS = {
    email: "admin123@login.com",
    password: "admin123"
};

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ role: "admin" }, secretKey, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
};

// Middleware to protect admin routes
exports.authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Forbidden: Not an admin" });
        }
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalJobs = await Job.countDocuments();
  
      res.json({ totalUsers, totalJobs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching dashboard stats" });
    }
  };


// Approve or Reject a User
const mongoose = require("mongoose");

exports.updateUserStatus = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const { userId, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { status },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("MongoDB Update Result:", updatedUser);
        res.status(200).json({ message: "User status updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating user status" });
    }
};




// API to Schedule Interview with File Upload
exports.scheduleInterview = async (req, res) => {
  try {
    const { jobId, interviewerEmail, interviewDate, interviewTime, location, interviewLink } = req.body;
    const file = req.file ? req.file.filename : null;

    // ✅ Fetch Job Details (Job Name & Company Name)
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Save Interview in MongoDB
    const newInterview = new Interview({
      jobId,
      interviewerEmail,
      interviewDate,
      interviewTime,
      location,
      interviewLink,
      file,
    });
    await newInterview.save();

    // ✅ Create a Global Notification with Job Name & Company
    const notification = new Notification({
      userId: null, // ✅ Global notification (all users)
      message: `Interview scheduled for "${job.jobTitle}" at "${job.companyName}". Date: ${interviewDate}, Time: ${interviewTime}, Location: ${location}.`,
      interviewLink: interviewLink, // ✅ Store interview link separately
      file: file ? `/uploads/${file}` : null, // ✅ Correct file path
      type: "Interview",
      createdAt: new Date(), // ✅ Explicit timestamp
    });
    await notification.save();

    res.status(201).json({ message: "Interview scheduled successfully!", interview: newInterview });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// API to Fetch Notifications (Including File)
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: null }).sort({ createdAt: -1 });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};


  // Post an Announcement
exports.createAnnouncement = async (req, res) => {
    try {
      const { title, message } = req.body;
  
      const announcement = new Announcement({ title, message });
      await announcement.save();
  
      res.json({ message: "Announcement posted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error posting announcement" });
    }
  };
  
  // Get all Announcements
  exports.getAnnouncements = async (req, res) => {
    try {
      const announcements = await Announcement.find().sort({ date: -1 });
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching announcements" });
    }
  };


  
  exports.getInterviews = async (req, res) => {
    try {
      const interviews = await Interview.find()
        .populate("candidateId", "name email") // Populate only necessary fields
        .populate("jobId", "title company"); // Populate only necessary fields
  
      res.status(200).json(interviews);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      res.status(500).json({ message: "Failed to fetch interviews" });
    }
  };
  