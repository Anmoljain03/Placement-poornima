const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, default: null }, // ✅ Default to null for global notifications
  message: { type: String, required: true },
  file: { type: String, required: false },
  interviewLink: { type: String, required: false }, // ✅ Add interview link field
  type: { type: String, required: true, enum: ["Interview", "General"], default: "General" },
  createdAt: { type: Date, default: Date.now },
  location: { type: String, required: false }, // ✅ Add location field
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
