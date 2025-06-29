const express = require("express");
const router = express.Router();
const { register, login, sendOTP, verifyOTP, getProfile, toggleFeePaid, updateProfile, contactUs } = require("../controllers/authController"); 
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/register", register);
router.put("/update-profile", authMiddleware, updateProfile);

router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/profile", authMiddleware, getProfile);
router.post("/contact", contactUs);

module.exports = router;