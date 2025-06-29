import React, { useState, useEffect, useRef } from "react";
import { RiGraduationCapLine } from "react-icons/ri";
import { FaUserCircle, FaBell } from "react-icons/fa"; // Add FaBell for notification icon
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/toast";

const Navbar = ({ isAuthenticated, setAuthState, isLoggedIn  }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const jobDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState(false);
    setIsAuth(false);
    showSuccessToast("Logged out successfully");
    navigate("/");
    window.location.reload();
  };




  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Token without 'Bearer'
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging line

        // Set the notification count directly from API response
        if (typeof data.notifications === "number") {
          setNotificationCount(data.notifications);
        } else {
          console.error("Invalid notifications format:", data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Prevent dropdown from closing when clicking inside it
  const handleJobDropdownClick = (e) => {
    e.stopPropagation(); // Prevent closing of dropdown
  };

  const handleProfileDropdownClick = (e) => {
    e.stopPropagation(); // Prevent closing of dropdown
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        jobDropdownRef.current &&
        !jobDropdownRef.current.contains(event.target)
      ) {
        setJobDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 text-[#1A365D] mr-2 hover:text-[#496c9c] font-semibold text-lg cursor-pointer transition duration-300"
          onClick={() => navigate("/")}
        >
          <RiGraduationCapLine size={28} />
          <span className="text-xl font-bold">Poornima Placement</span>
        </div>

        {/* Hamburger Button - Only on small screens */}
<div className="md:hidden">
  <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#1A365D] focus:outline-none">
    {menuOpen ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>
</div>


        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 items-center mr-3">
          {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }].map(
            ({ name, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${location.pathname === path
                      ? "bg-[#1A365D] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {name}
                </Link>
              </li>
            )
          )}

          {/* Jobs Dropdown */}
          <li
            className="relative"
            ref={jobDropdownRef}
            onClick={handleJobDropdownClick}
          >
            <button
              onClick={() => setJobDropdownOpen(!jobDropdownOpen)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 transition duration-300 flex items-center"
            >
              Jobs
              <span className="ml-1 text-xs">⮟</span> {/* Dropdown arrow */}
            </button>
            {jobDropdownOpen && (
              <ul className="absolute left-0 bg-white shadow-xl rounded-lg mt-2 w-44 z-50 border py-2 transition-all duration-200 opacity-100 transform scale-100">
                {[{ name: "Search Jobs", path: "/jobs" }, { name: "Saved Jobs", path: "/saved-jobs" }, { name: "My Applications", path: "/placement-tracking" }].map(
                  ({ name, path }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                        onClick={() => setJobDropdownOpen(false)}
                      >
                        {name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>

          {/* Statistics */}
          <li>
            <Link
              to="/statistics"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${location.pathname === "/statistics"
                  ? "bg-[#1A365D] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Statistics
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 ${location.pathname === "/contact"
                  ? "bg-[#1A365D] text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Contact
            </Link>
          </li>

          {/* Profile Dropdown */}
          {isAuth ? (
            <>


              {/* Profile Dropdown */}
              <li
                className="relative"
                ref={profileDropdownRef}
                onClick={handleProfileDropdownClick}
              >
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 flex items-center"
                >
                  <FaUserCircle size={26} />
                </button>
                {profileDropdownOpen && (
                  <ul className="absolute right-0 bg-white shadow-xl rounded-lg mt-2 w-32 z-50 border py-2 transition-all duration-200 opacity-100 transform scale-100">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 transition duration-200"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100 transition duration-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              {/* Notification Icon */}
              <li className="relative">
                <button
                  onClick={() => navigate("/notifications")}
                  className="text-gray-600 hover:text-gray-900 transition duration-300 p-5 flex justify-center items-center"
                >
                  <FaBell size={24} />
                  {notificationCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </li>


            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#1A365D] text-white hover:bg-gray-900 transition duration-300 shadow-md"
              >
                Login
              </Link>
            </li>
          )}
        </ul>


{/* Mobile Menu - Only visible when menuOpen is true */}
{menuOpen && (
  <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50 p-4 space-y-2">
    {[{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Statistics", path: "/statistics" }, { name: "Contact", path: "/contact" }].map(
      ({ name, path }) => (
        <Link
          key={path}
          to={path}
          onClick={() => setMenuOpen(false)}
          className={`block px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ${location.pathname === path
            ? "bg-[#1A365D] text-white"
            : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {name}
        </Link>
      )
    )}

    <div>
      <p className="text-sm font-semibold px-4 py-2 text-gray-700">Jobs</p>
      {[{ name: "Search Jobs", path: "/jobs" }, { name: "Saved Jobs", path: "/saved-jobs" }, { name: "My Applications", path: "/placement-tracking" }].map(
        ({ name, path }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            {name}
          </Link>
        )
      )}
    </div>

    {isAuth ? (
      <>
        <Link
          to="/profile"
          onClick={() => setMenuOpen(false)}
          className=" px-4 py-2 text-sm font-semibold text-[#1A365D] hover:bg-gray-100"
        >
          Profile
        </Link>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className=" w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
        <button
          onClick={() => {
            navigate("/notifications");
            setMenuOpen(false);
          }}
          className=" w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FaBell />
          Notifications
          {notificationCount > 0 && (
            <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </>
    ) : (
      <Link
        to="/login"
        onClick={() => setMenuOpen(false)}
        className="block px-4 py-2 text-sm font-semibold bg-[#1A365D] text-white rounded-md hover:bg-gray-900 text-center"
      >
        Login
      </Link>
    )}
  </div>
)}



      </div>
    </nav>
  );
};

export default Navbar;
