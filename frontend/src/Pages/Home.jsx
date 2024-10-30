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
        backgroundImage: `url('https://criptotendencia.com/wp-content/uploads/2024/03/En-oferta-Pantera-Capital-busca-comprar-SOL-del-patrimonio-de-FTX.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center w-full max-w-md">
        {/* <h1 className="text-5xl font-bold text-white font-serif">
          First U.S institutional asset manager focused exclusively on blockchain
        </h1>
         */}
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
