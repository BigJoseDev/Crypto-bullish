import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu
  const location = useLocation(); // Hook to get the current route

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Close the menu when navigating to a new page
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">CRYPTO BULLISH</h1>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
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
        <ul className={`flex-col md:flex md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:static bg-black md:bg-transparent w-full md:w-auto transition-transform duration-300 ${isOpen ? 'top-16' : 'top-[-200px]'}`}>
          <li>
            <Link to="/" className="mt-6 p-3 bg-white text-black rounded font-semibold hover:bg-green-400 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/signin" className="mt-6 p-3 bg-white text-black rounded font-semibold hover:bg-green-400 transition duration-300">Sign In</Link>
          </li>
          <li>
            <Link to="/signup" className="mt-6 p-3 bg-white text-black rounded font-semibold hover:bg-green-400 transition duration-300">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar
