const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.trim();
        console.log("Received Token:", token);

        if (!token) {
            return res.status(403).json({ error: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Admin Authentication Error:", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { authenticateAdmin };
            