const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    department: { type: String, required: true }, 
    registrationNumber: { type: String, required: true, unique: true },
    feePaid: { type: Boolean, default: true },
    profilePicture: { type: String, default: "" },  
    cgpa: { type: String, default: "" },
    academicYear: { type: String, default: "" },
    backlogs: { type: Number, default: 0 },
    attendance: { type: String, default: "" }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
