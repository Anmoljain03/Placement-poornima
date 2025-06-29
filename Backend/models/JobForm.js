const mongoose = require("mongoose");

const JobFormSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    fields: [
        {
            label: { type: String, required: true },
            type: { type: String, required: true },
            options: { type: [String], default: [] },
            required: { type: Boolean, default: true }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("JobForm", JobFormSchema);
