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
      setSuccessMessage('User registered successfully!'); // Display success message
      console.log(response.data);
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
    <div className="flex h-screen w-full bg-black text-white justify-center items-center " style={{
      backgroundImage: `url('https://images.mid-day.com/images/images/2023/jun/Tradecurve-0606_d.jpg')`,
      backgroundSize: 'cover',   // Ensures the image covers the whole div
      backgroundPosition: 'center',  // Centers the background image
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
    }}>
      
      <div className="bg-gray p-8 rounded-lg shadow-lg w-96 ">
        <h1 className="text-3xl font-bold text-center ">Sign Up</h1>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border rounded p-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded p-2 bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="p-2 bg-green-500 text-black rounded hover:bg-green-400 transition duration-300">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{' '}
            <button onClick={handleSignIn} className="text-green-500 hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
