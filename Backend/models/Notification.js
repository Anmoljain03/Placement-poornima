const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, default: null },
  message: { type: String, required: true },
  file: { type: String, required: false },
  interviewLink: { type: String, required: false }, 
  type: { type: String, required: true, enum: ["Interview", "General"], default: "General" },
  createdAt: { type: Date, default: Date.now },
  location: { type: String, required: false }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
module.exports = Notification;
