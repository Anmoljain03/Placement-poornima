const User = require("../models/user");
const OTP = require("../models/otpModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// mail username and password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "honeyjain245@gmail.com",
        pass: "uqvn lryq pkdx ejzb",
    },
});

//Register a new user
exports.register = async (req, res) => {
    try {
        console.log("Incoming Registration Request:", req.body);

        const { name, email, password, department, registrationNumber } = req.body;

        if (!name || !email || !password || !department || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({
            $or: [{ email }, { registrationNumber }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            department,
            registrationNumber,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//User Login with Email & Password
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // ✅ Return user details along with the token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                department: user.department,
                registrationNumber: user.registrationNumber,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
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

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Remove any previous OTPs for the user before saving a new one
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

exports.getProfile = async (req, res) => {
    try {
        const authHeader = req.header("Authorization"); // Get the Authorization header
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided or incorrect format" });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching profile data:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};



// Verify OTP & Login
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        // Find OTP in database
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });    
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: "OTP expired" });
        }

        // Delete OTP after successful verification
        await OTP.deleteOne({ _id: otpRecord._id });

        // Find user and generate JWT token
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
