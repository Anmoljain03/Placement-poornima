const express = require("express");
const router = express.Router();
const { register, login, sendOTP, verifyOTP, getProfile } = require("../controllers/authController"); 

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/profile", getProfile); // ✅ New profile route

module.exports = router;
