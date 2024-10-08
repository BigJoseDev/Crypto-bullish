import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedTokens, setPurchasedTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Fetch token data from CoinGecko API
    const fetchTokens = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      setTokens(data.slice(0, 100)); // Initially display 100 tokens
      setFilteredTokens(data.slice(0, 100)); // Set filtered tokens to display initially
    };
    fetchTokens();

    // Placeholder balance for the user
    setBalance('100,000');
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = tokens.filter((token) =>
      token.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTokens(filtered.slice(0, 6)); // Show filtered tokens, limited to 6
  };

  // Function to generate chart data for each token
  const generateChartData = (token) => ({
    labels: ['24h Low', '24h High'], // Using 24h low and high for simplicity
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

    setLoading(true); // Set loading to true

    // Simulate an API call to buy the token
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay for loading

    setPurchasedTokens((prevTokens) => [
      ...prevTokens,
      { token: selectedToken, amount: parseFloat(amount), purchasePrice: selectedToken.current_price }
    ]); // Add purchased token with purchase price to the list

    setLoading(false); // Set loading to false
    setIsModalOpen(false); // Close the modal
    setAmount(''); // Reset the amount after purchase
    setSelectedToken(null); // Reset selected token
  };

  return (
    <div className="dashboard-container flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300`}>
        <div className="sidebar-header flex justify-between items-center p-4">
          {/* <h2 className="text-lg font-bold">Menu</h2> */}
          <button onClick={toggleSidebar} className="sidebar-close-btn">
            <FaTimes />
          </button>
        </div>
        <ul className="sidebar-links">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Invest</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Deposit History</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Withdrawal</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Referral</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Account</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shrink' : 'expand'} ml-64 transition-all duration-300 p-6 bg-gray-100 min-h-screen`}>
        {/* Hamburger Button */}
        <button className="hamburger fixed top-4 left-4 text-white text-2xl" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mt-20 mb-4">Your Dashboard</h1>

        {/* Portfolio Overview */}
        <div className="border p-6 mb-6 rounded-lg bg-white shadow-lg">
          <h2 className="font-bold text-2xl text-gray-700 mb-2">Portfolio Overview</h2>
          <p className="text-lg text-gray-600">
            Total Balance: <span className="font-semibold text-blue-500">${balance}</span>
          </p>
        </div>

        {/* Added Bitcoin, Ethereum, Solana Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
          <div className="card bg-green-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Bitcoin Balance</h2>
            <p>$50,000.00</p>
          </div>
          <div className="card bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Ethereum Balance</h2>
            <p>$30,000.00</p>
          </div>
          <div className="card bg-yellow-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Solana Balance</h2>
            <p>$20,000.00</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Investments</h2>
          <div className="border p-6 bg-white rounded-lg shadow-lg text-center">
            {purchasedTokens.length > 0 ? (
              purchasedTokens.map((purchasedToken, index) => {
                const currentPrice = purchasedToken.token.current_price;
                const profitOrLoss = (currentPrice - purchasedToken.purchasePrice) * purchasedToken.amount;
                const isProfit = profitOrLoss > 0;

                return (
                  <div key={index} className={`border p-4 rounded-lg mb-4 ${isProfit ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className="text-lg font-semibold">
                      {purchasedToken.amount} of {purchasedToken.token.name}
                    </p>
                    <p className="text-gray-600">
                      Current Price: ${currentPrice} | {isProfit ? 'Profit' : 'Loss'}: ${profitOrLoss.toFixed(2)}
                    </p>
                  </div>
                );
              })
            ) : (
              <div>
                <p className="text-lg text-gray-600 mb-4">You have no investments yet.</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => setIsModalOpen(true)} // Open modal on button click
                >
                  Buy Tokens
                </button>
              </div>
            )}
          </div>
        </div>
        <br />

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="text"
            className="border p-2"
            placeholder="Search for a token..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Search
          </button>
        </div>

        {/* Live Cryptocurrency Prices with Graphs */}
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Live Cryptocurrency Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <div key={token.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold">{token.name} ({token.symbol.toUpperCase()})</h3>
              <p>Current Price: ${token.current_price}</p>
              <Line data={generateChartData(token)} options={{ responsive: true }} />
              <button
                className="bg-green-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => {
                  setSelectedToken(token);
                  setIsModalOpen(true);
                }}
              >
                Buy {token.name}
              </button>
            </div>
          ))}
        </div>

        {/* Buy Tokens Modal */}
        {isModalOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Buy {selectedToken?.name}</h2>
              <p>Current Price: ${selectedToken?.current_price}</p>
              <div className="mb-4">
                <label className="block mb-2">Amount:</label>
                <input
                  type="number"
                  className="border p-2 w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to buy" 
                />
              </div>
              <button
                className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleBuyToken}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Buy Token'}
              </button>
              <button
                className="mt-4  bg-red-500 text-white py-2 px-8 ml-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
