import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-black text-green-500 m-0"
      style={{
        backgroundImage: `url('https://t4.ftcdn.net/jpg/02/08/93/47/360_F_208934723_tv3JlZKwlOhF1QiQdBruyaetwLRxTQCD.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center w-full max-w-md">
        <h1 className="text-6xl font-semibold text-white font-serif">
          First U.S institutional asset manager focused on blockchain
        </h1>
        
        <button
          onClick={handleGetStarted}
          className= "btn"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
