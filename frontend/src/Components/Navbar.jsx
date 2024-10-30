// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import the logo
import logo from '../assets/logo.png'; // Use your local file path

const Navbar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu
  const [isAuthenticated, setIsAuthenticatedLocal] = useState(false); // Local state for authentication
  const location = useLocation(); // Hook to get the current route

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Close the menu when navigating to a new page
    setIsOpen(false);
  }, [location]);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, etc.)
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticatedLocal(false); // Update local authentication state
    setIsAuthenticated(false); // Update the global authentication state
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/'><img src={logo} alt="Pantera Capital Logo" className="h-10 mr-3" /></Link>
          <h1 className="text-white text-2xl font-bold font-serif">PANTERA CAPITAL</h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 transition-transform duration-300"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`flex-col font-serif md:flex md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto transition-transform duration-300 ${
            isOpen ? 'top-16 p-6 opacity-95 transform translate-y-0' : 'top-[-200px] opacity-0 transform -translate-x-40'
          }`}
        >
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Dashboard</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout} className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Sign out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="block mt-6 text-white rounded font-bold hover:bg-gray-700 transition duration-200">Home</Link>
              </li>
              {/* <li>
                <Link to="/signin" className="block mt-6 text-white rounded font-bold hover:bg-gray-700 transition duration-200">Sign In</Link>
              </li> */}
              <li>
                <Link to="/" onClick={handleLogout} className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Sign out</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
