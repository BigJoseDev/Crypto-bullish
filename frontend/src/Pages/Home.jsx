import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import About from './About';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <>
    <div
      className="relative flex items-center justify-center px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10 py-20 text-gray-800 bg-gray-900"
      style={{
        backgroundImage: `url('https://your-image-url.com')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to enhance text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>

      <div className="relative text-center w-full h-auto max-w-xl z-10 animate-fadeInLine delay-1000">
        <h1 className="text-6xl font-extrabold text-white leading-tight mb-6">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 font-[Poppins] animate-fadeInLine delay-700">
          Pantera ETF
        </span>
        
        {/* Animated Subheading with Line-by-Line Animation */}
        <span className="block text-gray-300 text-2xl mt-4 font-light font-[Roboto] animate-fadeInLine delay-300">
          Your Gateway to Smart Crypto Investing
        </span>
      </h1>

      {/* Animated Paragraph with Line-by-Line Animation */}
      <p className="text-gray-200 text-lg mb-8 max-w-lg mx-auto font-[Roboto] animate-fadeInLine delay-600">
        Transform your investments with our Crypto ETF. Leverage powerful strategies and advanced tools to grow your portfolio and secure your future in the digital asset world.
      </p>

        <button
          onClick={() => {
            handleGetStarted();
            window.scrollTo(0, 0); // Make sure to use 'window.scrollTo' for the scroll function
          }}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm sm:text-base px-10 py-4 rounded-full mt-6 transform hover:scale-110 transition-all ease-in-out duration-300 shadow-xl "
        >
          Get Started
        </button>
      </div>
      
    </div>
    <About/>
    </>
    
  );
};

export default Home;
