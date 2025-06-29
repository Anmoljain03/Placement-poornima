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
import AdminUsers from "./pages/admin/AdminUsers";
import JobApplicationForm from "./pages/JobApplicationForm";
import CreateForm from "./pages/admin/AdminCreateForm";
import Applications from "./pages/admin/Applications";
import AdminInterviewlist from "./pages/admin/AdminInterviewlist";
import PlacementTracking from "./pages/PlacementTracking";
import ContactUs from "./pages/ContactUs";
// import Schedule1stRound from "./pages/admin/Schedule1stRound";

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("auth"));
    setIsAuthenticated(userAuth?.isAuthenticated || false);

    const adminToken = localStorage.getItem("adminToken");
    setIsAdmin(!!adminToken);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      document.body.classList.add("admin-panel");
    } else {
      document.body.classList.remove("admin-panel");
    }
  }, [location]);

  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: authStatus }));
  };

  const handleAdminAuthChange = (adminStatus) => {
    setIsAdmin(adminStatus);
    if (!adminStatus) {
      localStorage.removeItem("adminToken");
    }
  };

  // Hide Navbar and Footer on these routes
  const hideNavbarRoutes = ["/login", "/register", "/admin/login"];
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Show Navbar only for user routes */}
      {!hideNavbarRoutes.includes(location.pathname) && !isAdminRoute && (
        <Navbar isAuthenticated={isAuthenticated} setAuthState={handleAuthChange} />
      )}

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
        <Route path="/apply/:jobId" element={<JobApplicationForm />} />
        <Route path="/placement-tracking" element={<PlacementTracking />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setAdminAuth={handleAdminAuthChange} />} />

        {isAdmin ? (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-job" element={<AddJob />} />
            <Route path="/admin/edit-job/:jobId" element={<EditJob />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/schedule-interview" element={<AdminScheduleInterview />} />
            {/* <Route path="/admin/schedule-1st-round" element={<Schedule1stRound />} /> */}
            <Route path="/admin/create-job-form" element={<CreateForm />} />
            <Route path="/admin/applications" element={<Applications />} />
            <Route path="/admin/scheduled-interviews" element={<AdminInterviewlist />} />
            <Route path="/admin/contact" element={<ContactUs />} />
          </>
        ) : (
          <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
        )}
      </Routes>

      {/* Show Footer only for user routes */}
      {!hideNavbarRoutes.includes(location.pathname) && !isAdminRoute && <Footer />}
      
      <ToastContainer />
    </>
  );
};

export default App;
