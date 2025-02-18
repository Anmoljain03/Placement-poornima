import React from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); 
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-2 text-[#1A365D] hover:text-[#496c9c]  font-semibold text-lg ">
        <RiGraduationCapLine size={26}/>
          <span>Poornima Placemet</span>
        </a>

        <ul className="hidden md:flex space-x-2">
          <li>
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === "/" ? "bg-[#1A365D] text-white font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link 
              to="/jobs" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === "/jobs" ? "bg-[#1A365D] text-white font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Jobs
            </Link>
          </li>
          <li>
            <Link 
              to="/statistics" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === "/statistics" ? "bg-[#1A365D] text-white font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Statistics
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === "/profile" ? "bg-[#1A365D] text-white font-semibold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                location.pathname === "/login" ? "bg-[#1A365D] text-white" : "bg-[#1A365D] text-white hover:bg-gray-900"
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

<section className="space-y-6">
<h2 className="text-2xl font-bold text-center text-primary">
  Featured Companies
</h2>
<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  {[1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="aspect-video bg-white rounded-lg shadow-sm p-4 flex items-center justify-center"
    >
      <div className="text-gray-400">Company Logo</div>
    </div>
  ))}
</div>
</section>
