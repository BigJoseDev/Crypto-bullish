// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import BuyToken from './Pages/BuyToken';
import Profile from './Pages/Profile';
import Footer from './Components/Footer';
import About from './Pages/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Main authentication state

  return (
    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/about' element ={<About/>}  />
          <Route path="/buytoken" element={<BuyToken />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
