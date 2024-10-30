// src/Pages/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      setSuccessMessage('Account created successfully!'); // Display success message

      // Wait for a few seconds before redirecting
      setTimeout(() => {
        navigate('/signin'); // Redirect to sign-in page
      }, 4000); // 4000 milliseconds = 3 seconds
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Registration failed'); // Display error message
      console.error(error);
    }
  };

  const handleSignIn = () => {
    // Redirect to the sign-in page
    navigate('/signin'); // Change this to the desired route
  };

  return (
    <div className="flex h-screen w-full bg-black text-white justify-center items-center" style={{
      backgroundImage: `url('https://t4.ftcdn.net/jpg/02/08/93/47/360_F_208934723_tv3JlZKwlOhF1QiQdBruyaetwLRxTQCD.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            <p className="text-lg">{successMessage}</p>
            <p className="text-sm">Redirecting to sign in...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-lg p-3 bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 shadow-lg">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <button onClick={handleSignIn} className="text-green-400 hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
