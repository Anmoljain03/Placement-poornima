const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

// ✅ Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error("❌ Missing required environment variables. Check your .env file.");
    process.exit(1);
}

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet()); // Security headers

//  Proper CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend to access API
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Auth Header
    credentials: true // Allow cookies if needed
}));

// ⏳ Rate limiting (prevents API abuse)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};
connectDB();

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
    console.error(" MongoDB Connection Error:", err.message);
});

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("API is running!");
});

// 🔹 Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(" Global Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

