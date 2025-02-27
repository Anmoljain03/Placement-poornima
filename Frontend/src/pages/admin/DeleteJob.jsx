import React, { useState } from "react";

const DeleteJob = () => {
  const [jobId, setJobId] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found! Please login again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/delete/${jobId}`, {
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

      alert("Job Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting job:", error.message);
      alert(`Error deleting job: ${error.message}`);
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
    </div>
  );
};

export default DeleteJob;
