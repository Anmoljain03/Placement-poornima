import React, { useEffect, useState } from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setAuthState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(isAuthenticated);

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setAuthState(false);
    setIsAuth(false);
    navigate("/");
    alert("Logged out successfully");
  };
    alert("Logged out successfully");
  }

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-2 text-[#1A365D] hover:text-[#496c9c] font-semibold text-lg">
          <RiGraduationCapLine size={26} />
          <span onClick={() => navigate("/")}>Poornima Placement</span>
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
              {isAuth ? "Jobs" : "Jobs"}
            </Link>
          </li>

          {/* Always Show Statistics */}
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

          {/* Show Profile when authenticated */}
          {isAuth && (
            <li>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  location.pathname === "/profile" ? "bg-[#1A365D] text-white font-semibold" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
              </Link>
            </li>
          )}

          {/* Show Login or Logout based on authentication state */}
          {isAuth ? (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm mb-6 font-semibold bg-red-600 text-white hover:bg-red-800"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#1A365D] text-white hover:bg-gray-900"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
