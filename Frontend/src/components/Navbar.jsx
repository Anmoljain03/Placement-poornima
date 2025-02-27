import React, { useEffect, useState } from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/toast";

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
    showSuccessToast("Logged out successfully");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Jobs" },
    { path: "/statistics", label: "Statistics" },
  ];

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-2 text-[#1A365D] hover:text-[#496c9c] font-semibold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          <RiGraduationCapLine size={26} />
          <span>Poornima Placement</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${
                  location.pathname === item.path
                    ? "bg-[#1A365D] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Profile Link (Only when authenticated) */}
          {isAuth && (
            <li>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${
                  location.pathname === "/profile"
                    ? "bg-[#1A365D] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
              </Link>
            </li>
          )}

          {/* Login/Logout Button */}
          <li>
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 -mt-3 rounded-lg text-sm font-semibold bg-gradient-to-r text-white from-purple-600 to-pink-600 opacity-75 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#1A365D] text-white hover:bg-gray-900 transition duration-300"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;