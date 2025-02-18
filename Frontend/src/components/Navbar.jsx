import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-3xl font-semibold px-9 text-gray-500">
            Poornima Placement
          </a>
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="text-gray-600">Home</Link></li>
            <li><Link to="/jobs" className="text-gray-600 ">Jobs</Link></li>
            <li><Link to="/statistics" className="text-gray-600 ">Statistics</Link></li>
            <li><Link to="/profile" className="text-gray-600 ">Profile</Link></li>
            <li><Link to="/login" className="bg-gray-800 text-white px-6 py-2 rounded-lg ml-6">Login</Link></li>
          </ul>
        </div>
      </nav> 
    </div>
  );
};

export default Navbar;
