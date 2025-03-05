import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../utils/toast";

const AdminLogin = ({ setAdminAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token
        setAdminAuth(true); // Set state
        navigate("/admin/dashboard"); 
        showSuccessToast("Login successfully!"); // Redirect
      } else {
        showErrorToast(data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      showWarningToast("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="p-6 bg-white shadow-md rounded" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
