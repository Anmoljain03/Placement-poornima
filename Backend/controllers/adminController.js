const jwt = require("jsonwebtoken");

const secretKey = "Poornima-Placement";

//admin credentials
const ADMIN_CREDENTIALS = {
    email: "admin123@login.com",
    password: "admin123"
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ role: "admin" }, secretKey, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
};

// Middleware to protect admin routes
exports.authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.role !== "admin") {
            return res.status(403).json({ error: "Forbidden: Not an admin" });
        }
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};
