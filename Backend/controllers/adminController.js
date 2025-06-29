const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");  
const Job = require("../models/Jobs");
const Interview = require("../models/interviewModel");
const Notification = require("../models/Notification");
const secretKey = "Poornima-Placement";
const JobForm = require("../models/JobForm");
const JobApplication = require("../models/JobApplication");
const PlacementTracking = require("../models/PlacementTracking");
const { io } = require("../server");
const nodemailer = require("nodemailer");

//admin credentials
const ADMIN_CREDENTIALS = {
    email: "admin123@login.com",
    password: "admin123"
};

//  Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if credentials are valid
        if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //  JWT token with admin role
        const token = jwt.sign(
            { role: "admin", email }, 
            secretKey, 
            { expiresIn: "7d" } 
        );

     
        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: "admin_id", 
                name: "Admin Name",
                email
            }
        });
    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// protect admin routes
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

exports.logout

//   dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await JobApplication.countDocuments(); // Count job applications

    res.json({ totalUsers, totalJobs, totalApplications });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve or Reject a User
const mongoose = require("mongoose");

exports.updateUserStatus = async (req, res) => {
    try {
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




exports.scheduleInterview = async (req, res) => {
  try {
    const { jobId, interviewerEmail, interviewDate, interviewTime, location, interviewLink } = req.body;
    const file = req.file ? req.file.filename : null;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

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

    const updatedPlacements = await PlacementTracking.updateMany(
      { jobId, status: "Pending" },
      { $set: { status: "Interview Scheduled" } },
      { new: true }
    );

    console.log(`Updated ${updatedPlacements.modifiedCount} placements to 'Interview Scheduled'`);

    if (global.io) {
      global.io.emit("updatePlacementStatus", { jobId });
      console.log("Real-time placement update sent via Socket.IO for Job ID:", jobId);
    } else {
      console.error("Socket.IO instance is undefined. Real-time updates can't be sent.");
    }

    // Fetch all users who applied for this job and update their notifications
    const appliedUsers = await PlacementTracking.find({ jobId, status: "Interview Scheduled" }).populate("userId", "email name");

    for (let placement of appliedUsers) {
      const userEmail = placement.userId.email;
      const userName = placement.userId.name;

      const notificationMessage = `Interview scheduled for "${job.jobTitle}" at "${job.companyName}". Date: ${interviewDate}, Time: ${interviewTime}, Location: ${location}.`;
      const notification = new Notification({
        userId: placement.userId._id,
        message: notificationMessage,
        interviewLink,
        file: file ? `/uploads/${file}` : null,
        type: "Interview",
        createdAt: new Date(),
      });
      await notification.save();

      // Send Email Notification
      // await sendInterviewEmail(userEmail, userName, job.jobTitle, job.companyName, interviewDate, interviewTime, location, interviewLink, file);
    }

    // Respond with Success
    res.status(201).json({
      message: "Interview scheduled successfully!",
      interview: newInterview,
      updatedPlacements: updatedPlacements.modifiedCount,
    });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getScheduledInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("jobId", "jobTitle companyName");
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch scheduled interviews" });
  }
};  


// const sendInterviewEmail = async (email, candidateName, jobTitle, companyName, interviewDate, interviewTime, location, interviewLink, file) => {
//   try {
//       let transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//               user: process.env.EMAIL_USER,
//               pass: process.env.EMAIL_PASS, 
//           },   
//       });

//       let mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: `Your Interview for ${jobTitle} at ${companyName} is Scheduled`,
//           html: `
//               <p>Dear ${candidateName},</p>
              
//               <p>We are pleased to inform you that your interview for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been scheduled. Below are the details of your interview:</p>
              
//               <p><strong>Interview Details:</strong></p>
//               <ul>
//                   <li><strong>Date:</strong> ${interviewDate}</li>
//                   <li><strong>Time:</strong> ${interviewTime}</li>
//                   <li><strong>Location:</strong> ${location}</li>
//                   ${interviewLink ? `<li><strong>Interview Link:</strong> <a href="${interviewLink}">${interviewLink}</a></li>` : ""}
//                   ${file ? `<li><strong>Attachment:</strong> <a href="http://yourserver.com/uploads/${file}" download>${file}</a></li>` : ""}
//               </ul>

//               <p><strong>Important Instructions:</strong></p>
//               <ul>
//                   <li>Ensure you have a stable internet connection if the interview is online.</li>
//                   <li>Be ready at least 10 minutes before the scheduled time.</li>
//                   <li>Dress professionally and be prepared with any necessary documents.</li>
//               </ul>

//               <p>If you have any questions or need to reschedule, please reply to this email at your earliest convenience.</p>

//               <p>We wish you the best of luck in your interview!</p>

//               <p>Best Regards,</p>
//               <p><strong>Babulal Sharma</strong><br>
//               Placement Cell<br>
//               Poornima University</p>
//           `,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log(`Interview email sent successfully to: ${email}`);
//   } catch (error) {
//       console.error("Error sending email:", error);
//   }
// };


exports.getNotifications = async (req, res) => {
  try {
      const { userId } = req.params; // Extract userId from URL params
      console.log("🔹 Received userId:", userId); 

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      // Fetch notifications for all users + specific user
      const notifications = await Notification.find({
          $or: [{ userId: null }, { userId }] // Ensure correct data format
      }).sort({ createdAt: -1 });

      console.log(`📩 Total Notifications Fetched: ${notifications.length}`);

      if (!notifications.length) {
          return res.status(404).json({ message: "No notifications found" });
      }

      res.status(200).json(notifications);
  } catch (error) {
      console.error("❌ Error fetching notifications:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
        .populate("candidateId", "name email")
        .populate("jobId", "title company");
  
      res.status(200).json(interviews);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      res.status(500).json({ message: "Failed to fetch interviews" });
    }
  };
  
  // Get All Users (for Admin Panel)
exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find({}, "name email registrationNumber department feePaid");
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
  }
};

//  Toggle User's Fee Paid Status
exports.toggleFeePaid = async (req, res) => {
  try {
      const { userId } = req.params;

      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Toggle the feePaid status
      user.feePaid = !user.feePaid;
      await user.save();

      res.status(200).json({ message: "Fee status updated successfully", feePaid: user.feePaid });
  } catch (error) {
      console.error("Error updating fee status:", error);
      res.status(500).json({ message: "Failed to update fee status" });
  }
};

//  Create Job Form (Admin)

exports.createJobForm = async (req, res) => {
    try {
        const { jobId, fields } = req.body;

        if (!jobId || !fields || !Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({ message: "Job ID and fields are required." });
        }

        // Validate each field to ensure it has a label and type
        for (let field of fields) {
            if (!field.label || field.label.trim() === "") {
                return res.status(400).json({ message: "Each field must have a valid label." });
            }
            if (!field.type) {
                return res.status(400).json({ message: "Each field must have a valid type." });
            }
        }

        const jobForm = new JobForm({ jobId, fields });
        await jobForm.save();

        res.status(201).json({ message: "Job form created successfully!", jobForm });
    } catch (error) {
        console.error("Error creating job form:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



//  Fetch Job Form (User Side)
exports.getJobForm = async (req, res) => {
    try {
        const { jobId } = req.params;
        const form = await JobForm.findOne({ jobId });

        if (!form) {
            return res.status(404).json({ message: "No form found for this job" });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error("Error fetching form:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// Submit Job Application
exports.submitJobApplication = async (req, res) => {
  try {
    const { userId, jobId, jobTitle, companyName, answers } = req.body;

    // Check if required fields are provided
    if (!userId || !jobId || !jobTitle || !companyName || !answers) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("🔹 Submitting job application for:", { userId, jobTitle, companyName });

    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({ userId, jobId });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Save the job application in JobApplication collection
    const newApplication = new JobApplication({
      userId,
      jobId,
      jobTitle,
      companyName,
      answers,
      status: "Pending",
    });

    // Save job application to the database
    await newApplication.save();

    // Update placement tracking with jobId
    try {
      console.log("Calling updatePlacementTracking...");
      await updatePlacementTracking(userId, jobTitle, companyName, jobId);
    } catch (trackingError) {
      console.error("Error updating placement tracking:", trackingError);
    }

    return res.status(201).json({
      message: "Job application submitted successfully.",
      newApplication,
    });
  } catch (error) {
    console.error("Server Error in submitJobApplication:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const updatePlacementTracking = async (userId, jobTitle, companyName, jobId, interviewData = null) => {
  try {
    // Check if the placement record already exists
    let placementRecord = await PlacementTracking.findOne({ userId, jobId });

    if (placementRecord) {
      // If interviewData is removed, update the status to "Completed"
      if (!interviewData) {
        placementRecord.status = "Completed";
      }

      await placementRecord.save();
      console.log("Placement Tracking Updated for Job ID:", jobId);
    } else {
      // If no existing record, create a new one with "Pending" status
      const newPlacement = new PlacementTracking({
        userId,
        jobId,
        jobTitle,
        companyName,
        status: "Pending",
      });

      await newPlacement.save();
      console.log("Placement Tracking Saved with Job ID:", jobId);
    }
  } catch (error) {
    console.error("Error updating placement tracking:", error);
    throw error;
  }
};


// Get User's Job Applications
exports.getUserApplications = async (req, res) => {
  try {
      const userId = req.params.userId;
      console.log("Fetching applications for user:", userId);
      
      const applications = await JobApplication.find({ userId }).populate("jobId");

      console.log("Applications Found:", applications);
      
      if (!applications.length) {
          return res.json({ message: "No applications found", applications: [] });
      }

      res.json({ applications });
  } catch (error) {
      console.error("Error fetching user applications:", error);
      res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate("userId jobId");

    console.log("Fetched Applications:", applications);

    if (!applications.length) {
      return res.status(200).json({ message: "No applications found", applications: [] });
    }

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

