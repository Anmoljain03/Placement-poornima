const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// ✅ Correct route for fetching notifications
router.get("/:userId", adminController.getNotifications);

module.exports = router;
