import React from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); 

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-2 text-primary font-semibold text-lg px-9">
        <RiGraduationCapLine size={26}/>
          <span>Poornima Placement</span>
        </a>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === "/" ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link 
              to="/jobs" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === "/jobs" ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link 
              to="/statistics" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === "/statistics" ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Statistics
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === "/profile" ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`px-6 py-2 rounded-lg ${
                location.pathname === "/login" ? "bg-gray-900 text-white" : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
