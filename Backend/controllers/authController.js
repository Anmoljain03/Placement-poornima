const User = require("../models/User");
const OTP = require("../models/otpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const JobApplication = require("../models/JobApplication");
const Interview = require("../models/interviewModel");
const Notification = require("../models/Notification");
const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();
const Contact = require("../models/contact");
// mail username and password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "honeyjain245@gmail.com",
        pass: "uqvn lryq pkdx ejzb",
    },
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profile_pictures");
    },
    filename: function (req, file, cb) {
        cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"), false);
    }
};

// Upload function (used inside updateProfile)
const upload = multer({ storage, fileFilter }).single("profilePicture");



exports.updateProfile = async (req, res) => {


    try {
        // Extract token directly from Authorization header (without "Bearer ")
        const token = req.headers.authorization;
        if (!token) {
            console.log("No token provided!");
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const userId = decoded.id;
        console.log("Extracted User ID:", userId);

        upload(req, res, async (err) => {
            if (err) {
                console.error("File Upload Error:", err);
                return res.status(400).json({ message: "Profile picture upload failed" });
            }

            console.log("Received Data:", req.body);

            let { cgpa, academicYear, backlogs, attendance } = req.body;

            // Find user in DB
            const user = await User.findById(userId);
            if (!user) {
                console.log("User not found in DB!");
                return res.status(404).json({ message: "User not found" });
            }

            // Convert values to correct types safely
            user.cgpa = cgpa ? parseFloat(cgpa) : user.cgpa;
            user.academicYear = academicYear || user.academicYear;
            user.backlogs = backlogs !== undefined && !isNaN(backlogs) ? parseInt(backlogs) : 0;

            user.attendance = attendance ? parseFloat(attendance) : user.attendance;

            // Update profile picture if uploaded
            if (req.file) {
                user.profilePicture = `/uploads/profile_pictures/${req.file.filename}`;
            }

            await user.save();
            console.log("Profile Updated:", user);

            return res.json({ message: "Profile updated successfully", user });
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




// Register a new user

exports.register = async (req, res) => {
    try {
        console.log("Incoming Registration Request:", req.body);

        const { name, email, password, department, registrationNumber } = req.body;

        if (!name || !email || !password || !department || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ $or: [{ email }, { registrationNumber }] });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 12); 

        // Create and save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            department,
            registrationNumber,
            feePaid: true, 
            role: "user" 
        });

        await newUser.save();

        // JWT token (Use same structure as login)
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                department: newUser.department,
                registrationNumber: newUser.registrationNumber
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// User Login
exports.login = async (req, res) => {
    try {
        const { email, password, registrationNumber } = req.body;

        if (!email || !password || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({
            email: { $regex: new RegExp(`^${email}$`, "i") },
            registrationNumber: { $regex: new RegExp(`^${registrationNumber}$`, "i") },
        });

        if (!user) {
            return res.status(400).json({ message: "User not found, please register" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const isAdmin = user.role === "admin";

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            userType: isAdmin ? "admin" : "user",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                registrationNumber: user.registrationNumber,
                feePaid: user.feePaid,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            console.log("No token provided!");
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const userId = decoded.id;
        console.log("Extracted User ID:", userId);

        const user = await User.findById(userId).select("-password");

        if (!user) {
            console.log("User not found in database!");
            return res.status(404).json({ message: "User not found" });
        }

        const applicationsCount = await JobApplication.countDocuments({ userId });
        const notificationsCount = await Notification.countDocuments({ userId });

        console.log("User Found:", user);

        res.status(200).json({
            ...user.toObject(),
            applications: applicationsCount,
            notifications: notificationsCount,
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Send OTP via Email
exports.sendOTP = async (req, res) => {
    try {
        console.log("Incoming OTP request:", req.body);

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.deleteMany({ email });

        await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });

        console.log(`Generated OTP for ${email}: ${otp}`);

        // Send OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER || "your-email@gmail.com",
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending OTP email:", error);
                return res.status(500).json({ message: "Failed to send OTP email" });
            }
            console.log("OTP email sent:", info.response);
            res.json({ success: true, message: "OTP sent successfully!" });
        });
    } catch (error) {
        console.error("OTP Sending Error:", error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};
    
// OTP & Login
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: "OTP expired" });
        }

        await OTP.deleteOne({ _id: otpRecord._id });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ message: "OTP verified, login successful", token });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
};

exports.contactUs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const contactMessage = new Contact({ name, email, subject, message });
        await contactMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Contact Form Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
