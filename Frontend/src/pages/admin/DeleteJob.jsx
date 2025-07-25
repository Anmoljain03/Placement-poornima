import React, { useState } from "react";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../utils/toast";

const DeleteJob = () => {
  const [jobId, setJobId] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showWarningToast("No token found! Please login again.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_LIVE_URL}/api/jobs/delete/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete job");
      }

      showSuccessToast("Job Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting job:", error.message);
      showErrorToast(`Error deleting job: ${error.message}`);
    }
  };


  return (
    <div className="border p-5">
      <h2 className="text-xl font-bold mb-3">Delete Job</h2>
      <input
        type="text"
        placeholder="Job ID"
        className="border p-2 w-full mb-2"
        value={jobId}
        onChange={(e) => setJobId(e.target.value)}
      />
      <button className="bg-red-500 text-white px-4 py-2" onClick={handleDelete}>Delete Job</button>
      <button></button>
    </div>
  );
};

export default DeleteJob;
