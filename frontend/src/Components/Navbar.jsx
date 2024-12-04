// // src/Components/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// // Import the logo
// import logo from '../assets/logo.png'; // Use your local file path

// const Navbar = ({ setIsAuthenticated }) => {
//   const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu
//   const [isAuthenticated, setIsAuthenticatedLocal] = useState(false); // Local state for authentication
//   const location = useLocation(); // Hook to get the current route

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     // Close the menu when navigating to a new page
//     setIsOpen(false);
//   }, [location]);

//   // Function to handle logout
//   const handleLogout = () => {
//     // Perform logout logic here (e.g., clearing tokens, etc.)
//     localStorage.removeItem('token'); // Clear the token
//     setIsAuthenticatedLocal(false); // Update local authentication state
//     setIsAuthenticated(false); // Update the global authentication state
//   };

//   return (
//     <nav className="bg-gray-900 p-4 shadow-md fixed top-0 left-0 right-0 z-10">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <Link to='/'><img src={logo} alt="Pantera Capital Logo" className="h-10 mr-3" /></Link>
//           <h1 className="text-white text-2xl font-bold font-serif">PANTERA CAPITAL</h1>
//         </div>

//         {/* Hamburger Icon for Mobile */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-white focus:outline-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-6 h-6 transition-transform duration-300"
//             >
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <ul
//           className={`flex-col font-serif md:flex md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-white absolute md:static bg-gray-900 md:bg-transparent w-full md:w-auto transition-transform duration-300 ${
//             isOpen ? 'top-16 p-6 opacity-95 transform translate-y-0' : 'top-[-200px] opacity-0 transform -translate-x-40'
//           }`}
//         >
//           {isAuthenticated ? (
//             <>
//               <li>
//                 <Link to="/dashboard" className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Dashboard</Link>
//               </li>
//               <li>
//                 <Link to="/" onClick={handleLogout} className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Sign out</Link>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/" className="block mt-6 text-white rounded font-bold hover:bg-gray-700 transition duration-200">Home</Link>
//               </li>
//               {/* <li>
//                 <Link to="/signin" className="block mt-6 text-white rounded font-bold hover:bg-gray-700 transition duration-200">Sign In</Link>
//               </li> */}
//               <li>
//                 <Link to="/" onClick={handleLogout} className="block mt-6 text-white rounded font-semibold hover:bg-gray-700 transition duration-200">Sign out</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react'
import logo from '../assets/logo.png'; // Use your local file path
import pantera from '../assets/pantera.png'; // Use your local file path
import icondash from '../assets/icondash.png'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken] = useState(true)

  return (
    <div className='fixed top-0 left-0 right-0 bg-white shadow-lg z-50 py-1   '>
    <div className=' flex items-center justify-between text-sm font-bold font-serif py-   border-b-gray-400'>
       <img  onClick= {()=>navigate('/')} className='w-48 ml-5 cursor-pointer' src={pantera} alt="" /> 
       <ul className='hidden md:flex items-start gap-5 font-medium`'>
            <NavLink to='/dashboard'>
                <li className='py-1'>DASHBOARD</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
            </NavLink>

            <NavLink to='/about' onClick={() => window.scrollTo(0, 0)}>
                <li className='py-1 '>ABOUT</li>
                <hr className='border-none outline-none h-0.5  w-3/5 m-auto hidden ' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden '/>
            </NavLink>
       </ul>

       <div className='flex items-center gap-4'>
        {
            token? 
                <div className=' flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-10 rounded-full mr-4' src={icondash} alt="" />
                {/* <img className='w-2 mr-4' src="https://cdn-icons-png.flaticon.com/512/203/203484.png" alt="" /> */}
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        {/* <p onClick={()=> navigate('/dashboard')} className='hover: text-black cursor-pointer'>Dashboard</p> */}
                        <p onClick={()=> navigate('/signin')} className='hover: text-black cursor-pointer'>Sign in</p>
                        {/* <p onClick={()=>setToken(false)} className='hover: text-black cursor-pointer'>Logout</p> */}
                        <p onClick={() => { window.scrollTo(0, 0); navigate('/about'); }} className='text-black bg-b cursor-pointer'>About</p>
                        <p onClick={()=> navigate('/')} className='hover: text-black cursor-pointer'>Sign out</p>
                    </div>
                </div>
            </div>
            : <div className=' flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWNGLGilxB_EygnmkdbDYDcJNFVdbKtzh0tQ&s" alt="" />
            <img className='w-2 mr-4' src="https://cdn-icons-png.flaticon.com/512/203/203484.png" alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=> navigate('/dashboard')} className='hover: text-black cursor-pointer'>Dashboard</p>
                    <p onClick={() => { window.scrollTo(0, 0); navigate('/about'); }} className='text-black bg-b cursor-pointer'>About</p>

                    <p onClick={()=> setToken(false)} className='hover: text-black cursor-pointer'>Logout</p>
                    {/* <p onClick={()=>setToken(false)} className='hover: text-black cursor-pointer'>Logout</p> */}
                </div>
            </div>
        </div>
        }
        
       </div>




    </div>
    </div>
  )
}

export default Navbar