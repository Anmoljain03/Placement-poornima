const User = require("../models/user"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => { 
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

        const hashedPassword = await bcrypt.hash(password, 10);

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

exports.login = async (req, res) => {
    try {
        const { email, password, registrationNumber } = req.body;

        if (!email || !password || !registrationNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user (case-insensitive email and registration number)
        const user = await User.findOne({
            email: { $regex: new RegExp(`^${email}$`, "i") },
            registrationNumber: { $regex: new RegExp(`^${registrationNumber}$`, "i") }
        });

        if (!user) {
            return res.status(400).json({ message: "User not found, please register" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
