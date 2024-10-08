import React from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    // Redirect to the sign-up or another relevant page
    navigate('/signup'); // Change this to the desired route
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-black text-green-500 m-0"
      style={{
        backgroundImage: `url('https://images.mid-day.com/images/images/2023/jun/Tradecurve-0606_d.jpg')`,
        backgroundSize: 'cover',   // Ensures the image covers the whole div
        backgroundPosition: 'center',  // Centers the background image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      }}
    >
      {/* Hero Section */}
      <div className="text-center bg-black bg-opacity-0 p-8 w-full">
        <h1 className="text-5xl font-bold text-white font-serif">Welcome to Crypto Bullish</h1>
        <p className="mt-4 text-lg text-white font-semibold font-serif">Track, buy, and manage your cryptocurrency investments easily.</p>
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
