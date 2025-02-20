const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "honeyjain245@gmail.com",
        pass: "wsda wwsk kjlq wucc" 
    }
});

router.post("/register", async (req, res) => {
    try {
        console.log("Incoming Request Data:", req.body);

        const { name, email, password, department, registrationNumber } = req.body;

        if (!name || !email || !password || !department || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let existingUser = await User.findOne({ $or: [{ email }, { registrationNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            department,
            registrationNumber,
        });

        await newUser.save();

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Welcome to Poornima Placement Portal – Your Career Starts Here",
            text:  `Dear ${name}

            Congratulations! You have successfully created an account on the Poornima Placement Portal. This platform is designed to connect you with top recruiters, exclusive job opportunities, and career resources to help you achieve your professional goals.  

Here’s what you can do next:  
✅ Complete your profile to increase visibility among recruiters.  
✅ Explore available job openings and internship opportunities.  
✅ Stay updated with upcoming placement drives and career workshops.  
 

For any queries or assistance, feel free to reach out to the Placement Cell at tpo@poornima.edu.in or visit our office.  

Wishing you all the best in your job search!  

Best Regards,  
Poornima Placement Cell
Poornima University`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Email Send Error:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        res.status(201).json({ message: "User registered successfully. Confirmation email sent!" });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password, registrationNumber } = req.body;

        if (!email || !password || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user in database (case-insensitive)
        const user = await User.findOne({
            email: { $regex: new RegExp(`^${email}$`, "i") },
            registrationNumber: { $regex: new RegExp(`^${registrationNumber}$`, "i") }
        });

        if (!user) {
            return res.status(400).json({ message: "User not Found, Please Register" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;