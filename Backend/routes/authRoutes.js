const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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

        const { name, email, pwd, dept, regno } = req.body;

        if (!name || !email || !pwd || !dept || !regno) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let existingUser = await User.findOne({ $or: [{ email }, { registrationNumber: regno }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            department: dept,
            registrationNumber: regno,
        });

        await newUser.save();

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Account Created Successfully",
            text: `Hello ${name},\n\nYour account has been successfully created on our platform.\n\nThank you for joining us!\n\nBest Regards,\nYour Company`
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

module.exports = router;
