import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import QRCode from 'react-qr-code';
import { Link} from 'react-router-dom';
import Navbar from '../Components/Navbar';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState({ bitcoin: 0, ethereum: 0, solana: 0 }); // Modified to store individual balances
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedTokens, setPurchasedTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // State for deposit modal
  const [depositToken, setDepositToken] = useState(null); // State for the token to be deposited
  const [paymentMethod, setPaymentMethod] = useState('bitcoin'); // State for the payment method

  
  const walletAddresses = {
    bitcoin: '7JFt45q7y9w2EPfQuCPhRLH2eo9Gtbuor', // Your Bitcoin wallet address
    ethereum: '0xYourEthereumWalletAddress', // Replace with your Ethereum wallet address
    solana: 'YourSolanaWalletAddress', // Replace with your Solana wallet address
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      setTokens(data.slice(0, 100)); // Initially display 100 tokens
      setFilteredTokens(data.slice(0, 100)); // Set filtered tokens to display initially
    };
    fetchTokens();
    
    // Set placeholder balances
    setBalance({ bitcoin: 0, ethereum: 0, solana: 0 }); 
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = tokens.filter((token) =>
      token.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTokens(filtered.slice(0, 6));
  };

  const generateChartData = (token) => ({
    labels: ['24h Low', '24h High'],
    datasets: [
      {
        label: `${token.name} Price`,
        data: [token.low_24h, token.high_24h],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 3,
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const handleBuyToken = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const totalCost = selectedToken.current_price * amount;
    const currentBalance = balance[paymentMethod];

    if (totalCost > currentBalance) {
      alert('Insufficient balance for this transaction.');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulated delay

    setPurchasedTokens((prevTokens) => [
      ...prevTokens,
      { token: selectedToken, amount: parseFloat(amount), purchasePrice: selectedToken.current_price },
    ]);
    
    setBalance((prevBalance) => ({
      ...prevBalance,
      [paymentMethod]: prevBalance[paymentMethod] - totalCost, // Deduct from the selected payment method
    }));

    setLoading(false);
    setIsModalOpen(false);
    setAmount('');
    setSelectedToken(null);
  };
  

  return (
    <>
    <Navbar/>
    <div className="dashboard-container flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300`}>
        <div className="sidebar-header flex justify-between items-center p-4">
          <button onClick={toggleSidebar} className="sidebar-close-btn">
            <FaTimes />
          </button>
        </div>
        <ul className="sidebar-links">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
         
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Deposit History</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Withdrawal</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Account</li>
          <li>
          <Link to="/" className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200">Sign out</Link>
          </li>
      
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shrink' : 'expand'} ml-64 transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
        <button className="hamburger fixed top-4 left-4 text-white text-2xl" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mt-20 mb-4  font-serif">Your Dashboard</h1>

        {/* Portfolio Overview */}
        <div className="border p-6 mb-6 rounded-lg bg- shadow-lg ">
          <h2 className="font-bold text-2xl text-gray-700 mb-2 font-serif">Hello, Robert</h2>
          
          <p className="text-lg text-gray-600 font-semibold ">
            Wallet Balance: <span className="font-bold text-blue-500">${Object.values(balance).reduce((acc, val) => acc + val, 0).toLocaleString()}</span>
          </p>
          
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
          {/* Bitcoin Balance Card */}
          <div className="card bg-green-500 text-white p-4 rounded-lg">
            <h2 className="font-bold font-serif">Bitcoin Balance</h2>
            <p>${balance.bitcoin.toLocaleString()}</p>
            <button
              className="bg-white text-green-500 py-2 px-4 rounded-lg mt-4 font-serif hover:bg-gray-100 transition-all duration-300"
              onClick={() => { setDepositToken('bitcoin'); setIsDepositModalOpen(true); }} // Open deposit modal for Bitcoin
            >
              Deposit Bitcoin
            </button>
          </div>

          {/* Ethereum Balance Card */}
          <div className="card bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="font-bold font-serif">Ethereum Balance</h2>
            <p>${balance.ethereum.toLocaleString()}</p>
            <button
              className="bg-white text-blue-500 py-2 font-serif px-4 rounded-lg mt-4 hover:bg-gray-100 transition-all duration-300"
              onClick={() => { setDepositToken('ethereum'); setIsDepositModalOpen(true); }} // Open deposit modal for Ethereum
            >
              Deposit Ethereum
            </button>
          </div>

          {/* Solana Balance Card */}
          <div className="card bg-purple-500 text-white p-4 rounded-lg">
            <h2 className="font-bold font-serif">Solana Balance</h2>
            <p>${balance.solana.toLocaleString()}</p>
            <button
              className="bg-white text-purple-500 py-2 font-serif px-4 rounded-lg mt-4 hover:bg-gray-100 transition-all duration-300"
              onClick={() => { setDepositToken('solana'); setIsDepositModalOpen(true); }} // Open deposit modal for Solana
            >
              Deposit Solana
            </button>
          </div>
        </div>

        {/* Deposit Modal */}
        {isDepositModalOpen && (
          <div className="modal-overlay fixed inset-13 flex items-center justify-center">
            <div className="modal bg-white p-20  rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Deposit {depositToken.charAt(0).toUpperCase() + depositToken.slice(1)}</h2>
              <p className="text-gray-600 mb-4">Send {depositToken.charAt(0).toUpperCase() + depositToken.slice(1)} to the wallet address below:</p>
              <QRCode value={walletAddresses[depositToken]} size={150} className="mb-4 px-1 ml-12" />
              <p className="font-semibold mb-4 ">{walletAddresses[depositToken]}</p>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => setIsDepositModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Token Purchase Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white font-serif py-2 px-4 rounded-lg" onClick={() => setIsModalOpen(true)}>Buy Tokens</button>
        </div>

        {/* Buy Token Modal */}
        {isModalOpen && (
          <div className="modal-overlay fixed inset-0 flex items-center justify-center">
            <div className="modal bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold font-serif">Buy Tokens</h2>
              <select value={selectedToken?.id} onChange={(e) => setSelectedToken(tokens.find(token => token.id === e.target.value))}>
                <option value="">Select Token</option>
                {filteredTokens.map(token => (
                  <option key={token.id} value={token.id}>{token.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded w-full mt-4"
              />
              <div className="mt-4">
                <h3 className="font-bold font-serif">Payment Method:</h3>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bitcoin"
                    name="paymentMethod"
                    value="bitcoin"
                    checked={paymentMethod === 'bitcoin'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="bitcoin" className="ml-2 font-serif">Bitcoin</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="ethereum"
                    name="paymentMethod"
                    value="ethereum"
                    checked={paymentMethod === 'ethereum'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="ethereum" className="ml-2 font-serif">Ethereum</label>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="radio"
                    id="solana"
                    name="paymentMethod"
                    value="solana"
                    checked={paymentMethod === 'solana'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="solana" className="ml-2 font-serif">Solana</label>
                </div>
              </div>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
                onClick={handleBuyToken}
                disabled={loading}
              >
                {loading ? 'Buying...' : 'Buy Token'}
              </button>
              <button className="bg-red-500 text-white py-2 px-7 rounded-lg ml-2 mt-4" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Purchased Tokens Section */}
        <div className="investment-history mt-6 ">
          {/* <h2 className="font-bold text-xl text-gray-800 mb-4 font-serif">Your Assets</h2> */}
          {purchasedTokens.length === 0 ? (
            <p className='font-serif'></p>
          ) : (
            purchasedTokens.map((investment, index) => (
              <div key={index} className="investment-card border rounded-lg p-4 mb-4 bg-white shadow">
                <h3 className="font-bold">{investment.token.name}</h3>
                <p>Amount: {investment.amount}</p>
                <p>Purchased Price: ${investment.purchasePrice}</p>
                <p>Current Value: ${investment.amount * investment.token.current_price}</p>
                
              </div>
            ))
          )}
        </div>
<div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Available Tokens</h2>
          <input
            type="text"
            className="border p-2 rounded-lg w-full mb-4"
            placeholder="Search for a token..."
            value={searchQuery}
            onChange={handleSearch}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTokens.map((token) => (
              <div key={token.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="font-bold text-xl">{token.name}</h3>
                <p>Price: ${token.current_price.toLocaleString()}</p>
                <p>24h Change: {token.price_change_percentage_24h.toFixed(2)}%</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
                  onClick={() => { setSelectedToken(token); setIsModalOpen(true); }}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Modal */}
        {isModalOpen && selectedToken && (
          <div className="modal-overlay fixed inset-0 flex items-center justify-center">
            <div className="modal bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Buy {selectedToken.name}</h2>
              <p className="mb-4">Price: ${selectedToken.current_price.toLocaleString()}</p>
              <input
                type="number"
                className="border p-2 rounded-lg w-full mb-4"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="mb-4">Total Cost: ${(selectedToken.current_price * amount).toFixed(2)}</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleBuyToken}>
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        
        
      </div>
    </div>
    </>
  );
};


export default Dashboard;
