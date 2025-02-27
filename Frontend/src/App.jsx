import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
    localStorage.setItem("auth", JSON.stringify({ isAuthenticated: authStatus }));

    if (authStatus) {
      navigate("/"); // Redirect to home after login/register
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setAuthState={handleAuthChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login setAuthState={handleAuthChange} />} />
        <Route path="/register" element={<Register setAuthState={handleAuthChange} />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
