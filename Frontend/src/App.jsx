import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import AdminScheduleInterview from "./pages/admin/AdminScheduleInterview";
import Notifications from "./pages/Notifications";

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
   
    const checkAuthStatus = () => {
      const userAuth = JSON.parse(localStorage.getItem("auth"));
      setIsAuthenticated(userAuth?.isAuthenticated || false);

      const adminToken = localStorage.getItem("token");
      setIsAdmin(!!adminToken);
    };

    checkAuthStatus();
  }, [location.pathname]); 
  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: authStatus }));
  };

  const handleAdminAuthChange = (adminStatus) => {
    setIsAdmin(adminStatus);
    if (!adminStatus) {
      localStorage.removeItem("token");
    }
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar isAuthenticated={isAuthenticated} setAuthState={handleAuthChange} />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setAuthState={handleAuthChange} />} />
        <Route path="/register" element={<Register setAuthState={handleAuthChange} />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setAdminAuth={handleAdminAuthChange} />} />
        <Route path="/admin/schedule-interview" element={<AdminScheduleInterview />} />
        <Route path="/admin/dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/add-job" element={isAdmin ? <AddJob /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/edit-job/:jobId" element={isAdmin ? <EditJob /> : <Navigate to="/admin/login" />} />
      </Routes>

      {!isAdminRoute && <Footer />}
      <ToastContainer />
    </>
  );
};

export default App;
