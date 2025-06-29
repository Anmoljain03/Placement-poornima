import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { motion } from "framer-motion";

const JobApplicationForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const fetchFormAndJobDetails = async () => {
            try {
                const [formResponse, jobResponse] = await Promise.all([
                    fetch(`${import.meta.env.VITE_LIVE_URL}/api/admin/get-job-form/${jobId}`),
                    fetch(`${import.meta.env.VITE_LIVE_URL}/api/jobs/${jobId}`)
                ]);

                if (!formResponse.ok) throw new Error("Failed to load form");
                if (!jobResponse.ok) throw new Error("Failed to load job details");

                const formData = await formResponse.json();
                const jobData = await jobResponse.json();
                setFormData(formData);
                setJob(jobData);

                const initialValues = {};
                formData.fields.forEach((field) => {
                    initialValues[field.label] = "";
                });
                setFormValues(initialValues);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFormAndJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            showErrorToast("User not found. Please log in.");
            return;
        }

        const userId = user.id || user._id;
        if (!userId || !job) {
            showErrorToast("Missing user or job details.");
            return;
        }

        const applicationData = {
            userId,
            jobId: job._id,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            answers: formValues,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/admin/submit-job-application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(applicationData),
            });


            if (!response.ok) throw new Error("Submission failed");
            showSuccessToast("Application submitted successfully!");
            navigate("/placement-tracking");
        } catch (error) {
            showErrorToast(error.message);
        }
    };

    if (loading) return <h2 className="text-center text-white">Loading...</h2>;
    if (error) return <h2 className="text-red-500 text-center">{error}</h2>;
    if (!formData) return <h2 className="text-gray-400 text-center">No form found.</h2>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-black p-6"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-xl w-full"
            >
                <h2 className="text-4xl font-bold text-center text-white mb-6">Apply for {job.jobTitle}</h2>
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {formData.fields.map((field, index) => (
                        <motion.div
                            key={field._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="mb-4"
                        >
                            <label className="block text-white font-medium">{field.label}</label>
                            {field.type === "textarea" ? (
                                <textarea
                                    name={field.label}
                                    value={formValues[field.label] || ""}
                                    required={field.required}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-400 focus:outline-none transition duration-300"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.label}
                                    value={formValues[field.label] || ""}
                                    required={field.required}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-400 focus:outline-none transition duration-300"
                                />
                            )}
                        </motion.div>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
                    >
                        Submit Application
                    </motion.button>
                </motion.form>
            </motion.div>
        </motion.div>
    );
};

export default JobApplicationForm;
