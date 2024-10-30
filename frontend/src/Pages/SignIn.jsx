import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      if (response.data) {
        // Store the token if needed
        localStorage.setItem('token', response.data.token);

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Incorrect login information');
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white justify-center items-center" 
      style={{
        backgroundImage: `url('https://t4.ftcdn.net/jpg/02/08/93/47/360_F_208934723_tv3JlZKwlOhF1QiQdBruyaetwLRxTQCD.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-6">Sign In</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-green-400 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
