// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import BuyTokens from './Pages/BuyToken';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="    ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/buytokens" element={<BuyTokens />} />
          <Route path="/signup" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
