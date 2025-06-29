const Job = require("../models/Jobs");
const JobApplication = require("../models/JobApplication");
const PlacementTracking = require("../models/PlacementTracking");
const User = require("../models/User");
const mongoose = require("mongoose");
const Interview = require("../models/interviewModel");
const moment = require("moment");
const nodemailer = require("nodemailer");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer for file uploads     
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to allow only PDF, DOC, and DOCX files
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and Word documents are allowed!"), false);
    }
};

// Multer upload middleware
const upload = multer({ storage, fileFilter });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Post a New Job (Admin)


// Modify postJob function
const postJob = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const requiredFields = [
      "jobTitle",
      "companyName",
      "jobLocation",
      "package",
      "jobRequirements",
      "duration",
      "department",
      "deadline",
      "jobDescription"
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
    }

    let jobRequirements = req.body.jobRequirements;
    if (typeof jobRequirements === "string") {
      jobRequirements = JSON.parse(jobRequirements);
    }

    let jobDescriptionFile = req.file ? `/uploads/${req.file.filename}` : null;

    const newJob = new Job({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      jobLocation: req.body.jobLocation,
      package: req.body.package,
      jobDescription: req.body.jobDescription,
      jobDescriptionFile,
      jobRequirements,
      duration: req.body.duration,
      department: req.body.department,
      deadline: req.body.deadline,
    });

    await newJob.save();
    console.log("Job saved successfully!");

    // Fetch all users
    const users = await User.find({}, "email name");
    console.log(`Found ${users.length} users to notify.`);

    // Send email notifications
    for (const user of users) {
      console.log(`Sending email to: ${user.email}`);
      await sendJobNotificationEmail(
        user.email,
        user.name,
        newJob.jobTitle,
        newJob.companyName,
        newJob.jobLocation,
        newJob.package,
        newJob.jobDescription,
        newJob.jobRequirements,
        newJob.deadline,
        newJob.department
      );
      console.log(`Email sent to: ${user.email}`);
    }

    res.status(201).json({
      message: "Job posted successfully! Emails sent to all users.",
      job: newJob,
    });

  } catch (error) {
    console.error(" Error posting job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





// send job notification email
const sendJobNotificationEmail = async (
  email,
  name,
  jobTitle,
  companyName,
  jobLocation,
  package,
  jobDescription,
  jobRequirements,
  deadline,
  department
) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Job Opening: ${jobTitle} at ${companyName}`,
      html: `
        <p>Dear ${name},</p>
        <p>We are excited to inform you about a new job opportunity.</p>
        <h3>Job Details:</h3>
        <ul>
          <li><strong>Position:</strong> ${jobTitle}</li>
          <li><strong>Company:</strong> ${companyName}</li>
          <li><strong>Location:</strong> ${jobLocation}</li>
          <li><strong>Package:</strong> ${package}</li>
          <li><strong>Application Deadline:</strong> ${deadline}</li>
          <li><strong>Department:</strong> ${department}</li>
        </ul>
        <p>If you are interested, please visit our website and apply before the deadline.</p>
        <p>Best Regards,<br>Placement Cell<br>Poornima University</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email} - Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};


module.exports = sendJobNotificationEmail;





// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
      const jobs = await Job.find();

      // Add fileUrl to each job if a file exists
      const updatedJobs = jobs.map(job => ({
          ...job._doc, // Spread existing job fields
          fileUrl: job.jobDescriptionFile ? `http://localhost:5000${job.jobDescriptionFile}` : null
      }));

      res.json(updatedJobs);
  } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};



// Get Job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Edit Job (Admin)
const editJob = async (req, res) => {
    try {
        const updateFields = {};
        const allowedFields = [
            "jobTitle",
            "companyName",
            "jobLocation",
            "package",
            "jobDescription",
            "jobRequirements",
            "duration",
            "department",
            "deadline"
        ];

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

        if (!updatedJob) return res.status(404).json({ message: "Job not found" });

        res.status(200).json(updatedJob);
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Job (Admin)
const deleteJob = async (req, res) => {
    try {
      const { id } = req.params;  
  
      if (!id) return res.status(400).json({ error: "Job ID is required" });
  
      const job = await Job.findById(id);  
      if (!job) return res.status(404).json({ error: "Job not found" });
  
      await Job.findByIdAndDelete(id);  
      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//  Apply for a Job
const applyForJob = async (req, res) => {
  try {
    const { userId, jobId, jobTitle, companyName } = req.body;

    // Check if the user has already applied for this job
    const existingApplication = await PlacementTracking.findOne({ userId, jobId });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create new placement tracking entry
    const newTracking = new PlacementTracking({
      userId,
      jobId,
      jobTitle,
      companyName,
      status: "Pending",
    });

    await newTracking.save();

    res.status(201).json({ message: "Job application submitted successfully" });

  } catch (error) {
    console.error("Error saving placement tracking:", error);
    res.status(500).json({ message: "Error applying for job", error });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    const appliedJobs = await PlacementTracking.find({ userId }).select("jobId");

    res.status(200).json({ applications: appliedJobs });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Error fetching applied jobs", error });
  }
};

  
// Track Placement Status
const trackPlacementStatus = async (req, res) => {
    try {
        const newTracking = new PlacementTracking({
            userId,
            jobId,
            companyName,
            jobTitle,
            status: "Pending"
        });
        
        console.log("Data to be saved:", { userId, jobId, companyName, jobTitle });

        await newTracking.save();
        res.status(201).json({ message: "Placement tracking added successfully" });
    } catch (error) {
        console.error("Error saving placement tracking:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


// Update Placement Status
const updatePlacementStatus = async (req, res) => {
    try {
      const { trackingId } = req.params;
  
      const tracking = await PlacementTracking.findById(trackingId);
      if (!tracking) return res.status(404).json({ message: "Tracking record not found" });
  
      tracking.status = "Interview Scheduled";
      await tracking.save();
  
      io.emit("updatePlacementStatus", { jobId: tracking.jobId });
  
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating placement status:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
 
  

  const getPlacementStatus = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(`Fetching placement tracking for user: ${userId}`);
  
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
  
      const objectId = new mongoose.Types.ObjectId(userId);
  
      // Get all placements for the user
      let placements = await PlacementTracking.find({ userId: objectId });
  
      if (placements.length === 0) {
        return res.status(404).json({ message: "No placement tracking found." });
      }
  
      // Fetch jobIds from placements
      const jobIds = placements.map((placement) => placement.jobId);
  
      // Fetch all interviews related to those jobs
      const interviews = await Interview.find({ jobId: { $in: jobIds } });
  
      // Get today's date without time
      const today = moment().startOf("day");
  
      // Find jobIds where the interview date has passed
      const completedJobIds = interviews
        .filter((interview) => moment(interview.interviewDate).startOf("day").isBefore(today))
        .map((interview) => interview.jobId);
  
      if (completedJobIds.length > 0) {
        // Bulk update all placements whose interview date has passed
        await PlacementTracking.updateMany(
          { jobId: { $in: completedJobIds }, status: { $ne: "Completed" } },
          { $set: { status: "Completed" } }
        );
      }
  
      // Fetch updated placements after bulk update
      placements = await PlacementTracking.find({ userId: objectId });
  
      console.log("Updated Placement Tracking:", placements);
      return res.status(200).json(placements);
    } catch (error) {
      console.error("Error fetching placement status:", error);
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  

// jobController.js


const updatePlacementTracking = async (userId, jobTitle, companyName) => {
  try {
    console.log("Checking placement tracking for:", { userId, jobTitle, companyName });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const filter = { userId: userObjectId, jobTitle, companyName };
    const update = { $set: { status: "Pending" } };
    const options = { upsert: true, new: true };

    const placementTracking = await PlacementTracking.findOneAndUpdate(filter, update, options);

    if (!placementTracking) {
      console.log("No placement tracking entry was updated/created.");
    } else {
      console.log("Placement Tracking Updated:", placementTracking);
    }
  } catch (error) {
    console.error("Error updating Placement Tracking:", error);
  }
};




module.exports = { 
  upload,
    postJob, 
    getAllJobs, 
    getJobById, 
    editJob, 
    deleteJob, 
    applyForJob, 
    getAppliedJobs,
    trackPlacementStatus, 
    updatePlacementStatus, 
    getPlacementStatus,
    updatePlacementTracking
};

