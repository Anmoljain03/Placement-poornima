const express = require("express");
const router = express.Router();

// Example route (modify as needed)
router.get("/", (req, res) => {
    res.send("Notification API is working!");
});

module.exports = router;
