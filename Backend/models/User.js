const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Change `pwd` to `password`
    department: { type: String, required: true }, // Change `dept` to `department`
    registrationNumber: { type: String, required: true, unique: true } // Change `regno` to `registrationNumber`
});

module.exports = mongoose.model("User", UserSchema);
