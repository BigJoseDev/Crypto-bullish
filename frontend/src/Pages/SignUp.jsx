import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true); // Set loading to true on submit

    try {
      // Register user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Account created successfully!');
      
      setTimeout(() => {
        navigate('/signin');
        setIsLoading(false); // Reset loading state (optional)
      }, 1000);
    } catch (error) {
      setError(error.message || 'Registration failed');
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className="rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10 flex flex-col items-center gap-4 py-16 text-white bg-gray-900">
      <div className="bg-gray-900 mt-8 mb-8 bg-opacity-70 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          <button
            type="submit"
            disabled={isLoading} // Disable the button when loading
            className={`${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            } bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm sm:text-base px-10 py-4 rounded-full mt-6 transform transition-all ease-in-out duration-300 shadow-xl`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-green-400 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
