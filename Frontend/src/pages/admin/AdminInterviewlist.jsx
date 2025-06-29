import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";

const AdminScheduledInterviews = () => {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/scheduled-interviews")
            .then(response => response.json())
            .then(data => setInterviews(data))
            .catch(error => console.error("Error fetching interviews:", error));
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold text-[#1A365D] mb-6">Scheduled Interviews</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {interviews.map((interview, index) => (
                        <motion.div
                            key={interview._id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-6 rounded-2xl shadow-lg bg-[#1A365D] bg-opacity-90 backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-transform transform hover:scale-[1.02]"
                        >
                            <h3 className="font-semibold text-xl text-white">{interview.jobId.jobTitle}</h3>
                            <p className="text-md text-white">{interview.jobId.companyName}</p>

                            <div className="mt-4 space-y-2">
                                <p><span className="font-medium text-white">📧 Interviewer Email:</span> <span className="text-white">{interview.interviewerEmail}</span></p>
                                <p><span className="font-medium text-white">📅 Date:</span> <span className="text-white">{interview.interviewDate}</span></p>
                                <p><span className="font-medium text-white">⏰ Time:</span> <span className="text-white">{interview.interviewTime}</span></p>
                                <p><span className="font-medium text-white">📍 Location:</span> <span className="text-white">{interview.location}</span></p>
                                <p>
                                    <span className="font-medium text-white">🔗 Link:</span>
                                    <a
                                        href={interview.interviewLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 ml-1"
                                    >
                                        {interview.interviewLink}
                                    </a>

                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminScheduledInterviews;
