import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} /> 
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </>
  );
};

export default App;
