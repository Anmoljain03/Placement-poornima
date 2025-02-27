const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization"); // ✅ Check for token in request headers

        if (!token) {
            return res.status(403).json({ error: "Access denied. No token provided." });
        }

        // ✅ Verify JWT (Make sure the secret key matches your `.env` file)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        req.admin = decoded; // ✅ Set admin details in request
        next();
    } catch (error) {
        console.error("❌ Admin Authentication Error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { authenticateAdmin };
