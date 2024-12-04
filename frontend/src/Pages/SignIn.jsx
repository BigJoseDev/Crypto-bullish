import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase auth instance

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Show loading state

    try {
      // Simulate loading delay for animation effect (optional)
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard on success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // Redirect after animation
    } catch (error) {
      setError('Something went wrong');
      setIsLoading(false); // Hide loading state if error occurs
    }
  };

  return (
    <div className="rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10 flex flex-col items-center gap-4 py-16 text-white bg-gray-900">
      <div className="bg-gray-900 mt-8 mb-8 bg-opacity-70 p-8 rounded-lg shadow-2xl w-full max-w-md">
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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="submit"
            disabled={isLoading} // Disable button while loading
            className={`${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-blue-500 transform hover:scale-110 transition-all ease-in-out duration-300 shadow-xl'
            } text-white text-sm sm:text-base px-10 py-4 rounded-full mt-6`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-green-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
