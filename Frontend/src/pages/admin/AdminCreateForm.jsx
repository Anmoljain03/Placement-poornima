import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import Sidebar from "../../components/admin/Sidebar";
import { motion } from "framer-motion";

const AdminCreateForm = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [fields, setFields] = useState([{ label: "", type: "text", placeholder: "", options: [] }]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
  const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/jobs`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  const data = await response.json();
  setJobs(data);
}
catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    const handleFieldChange = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value.trim();
        setFields(newFields);
    };

    const addField = () => {
        setFields([...fields, { label: "", type: "text", placeholder: "", options: [] }]);
    };

    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedJob) {
            showErrorToast("Please select a job before submitting.");
            return;
        }

        const validFields = fields.map(field => ({
            label: field.label.trim() || null,
            type: field.type || "text",
            placeholder: field.placeholder || "",
            options: field.options || []
        }));

        if (validFields.some(field => !field.label)) {
            showErrorToast("All fields must have a valid label.");
            return;
        }

        const jobFormData = { jobId: selectedJob, fields: validFields };

        try {
            const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/admin/create-job-form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobFormData)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to create job form");

            showSuccessToast("Job form created successfully!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error creating job form:", error);
            showErrorToast(error.message || "Error creating job form.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <Sidebar />
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-center items-center w-full p-6"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-3xl"
                >
                    <h2 className="text-3xl font-bold text-center text-white mb-6">🚀 Create Job Application Form</h2>

                    {/* Job Selection Dropdown */}
                    <motion.select
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                        className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300"
                        onChange={(e) => setSelectedJob(e.target.value)}
                    >
                        <option value="">Select Job</option>
                        {jobs.map((job) => (
                            <option key={job._id} value={job._id}>
                                {job.jobTitle} - {job.companyName}
                            </option>
                        ))}
                    </motion.select>

                    {/* Dynamic Fields */}
                    <div className="mt-4 space-y-4">
                        {fields.map((field, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <input
                                    type="text"
                                    placeholder="Field Label"
                                    value={field.label}
                                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                                    className="w-1/4 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none transition duration-300"
                                />

                                <select
                                    value={field.type}
                                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                                    className="w-1/4 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none transition duration-300"
                                >
                                    <option value="text">Text</option>
                                    <option value="number">Number</option>
                                    <option value="file">File</option>
                                    <option value="dropdown">Dropdown</option>
                                </select>

                                {field.type === "dropdown" && (
                                    <input
                                        type="text"
                                        placeholder="Comma-separated options"
                                        value={field.options.join(", ")}
                                        onChange={(e) => handleFieldChange(index, "options", e.target.value.split(", "))}
                                        className="w-1/4 p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-blue-400 focus:outline-none transition duration-300"
                                    />
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeField(index)}
                                    className="text-white px-3 py-2 rounded-lg shadow-lg  hover:bg-red-300"
                                >
                                    ❌
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-between">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addField}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                        >
                            ➕ Add Field
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                        >
                            ✅ Save Form
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminCreateForm;
