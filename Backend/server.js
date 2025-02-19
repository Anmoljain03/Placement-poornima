require("dotenv").config({ path: "./config.env" }); // Load .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();  // Make sure this line is present

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs incoming requests

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

// MongoDB Connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file!");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

// Start the server only after DB connection
const startServer = async () => {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Default Route
app.get("/", (req, res) => {
    res.send("API is running!");
});

// Start Server
startServer();

// Handle Uncaught Errors
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});
