import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    // Redirect to the sign-up or another relevant page
    navigate('/signup'); // Change this to the desired route
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-green-500 m-0">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-bold">Welcome to Crypto Bullish</h1>
        <p className="mt-4 text-lg">Track, buy, and manage your cryptocurrency investments easily.</p>
        <button
          onClick={handleGetStarted}
          className="mt-6 p-3 bg-white text-black rounded font-semibold hover:bg-green-400 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
