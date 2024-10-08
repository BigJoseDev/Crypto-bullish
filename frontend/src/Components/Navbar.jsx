import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu
  const [isAuthenticated, setIsAuthenticated] = useState(true); // State for authentication
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
    setIsAuthenticated(false); // Update the authentication state


    // const handleSignin =()=>{
      
    //   setIsAuthenticated(true)
    // }
  };

  return (
    // Only adding `fixed top-0 left-0 right-0 z-10` to fix the navbar at the top
    <nav className="bg-gray-800 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold font-serif">CRYPTO BULLISH</h1>

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
        <ul className={`flex-col font-serif md:flex md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:static bg-black md:bg-transparent w-full md:w-auto transition-transform duration-300 ${isOpen ? 'top-16' : 'top-[-200px]'}`}>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="mt-6 text-white rounded font-semibold ">Dashboard</Link>
              </li>
              <li>
                <Link to="/buytokens" className="mt-6   text-white rounded font-semibold ">Buy Tokens</Link>
              </li>
              <li>
                <Link to="/profile" className="mt-6 text-white rounded font-semibold ">Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout} className="mt-6  text-white rounded font-semibold ">Sign out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="mt-6   text-white rounded font-bold hover:bg- transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/signin"  className="mt-6   text-white rounded font-bold hover: transition duration-300">Sign In</Link>
              </li>
              <li>
                <Link to="/signup" className="mt-6  text-white rounded font-bold  hover: transition duration-300">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
