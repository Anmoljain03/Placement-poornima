const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.PORT) {
    console.error("Missing required environment variables. Check .env file.");
    process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet()); // Security headers

// Allow frontend to access API
app.use(cors({
    origin: "http://localhost:5173", // ✅ Your frontend URL
    credentials: true, // ✅ Allow cookies and headers
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Ensure Authorization header is allowed
  }));


// Rate limiting (prevents abuse of endpoints)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// FIXED: Proper CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Auth Header
    credentials: true // Allow cookies if needed
}));

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("API is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful Shutdown Handling
process.on("uncaughtException", (err) => {
    console.error(" Uncaught Exception:", err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});
