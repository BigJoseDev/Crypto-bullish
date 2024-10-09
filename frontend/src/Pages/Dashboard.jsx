import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import QRCode from 'react-qr-code';

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
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // State for deposit modal
  const [depositToken, setDepositToken] = useState(null); // State for the token to be deposited

  const walletAddresses = {
    bitcoin: 'bc1qxy2kgdygjrsqtzq2n0yrf2476', // Your Bitcoin wallet address
    ethereum: '0xYourEthereumWalletAddress', // Replace with your Ethereum wallet address
    solana: 'YourSolanaWalletAddress', // Replace with your Solana wallet address
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      setTokens(data.slice(0, 500)); // Initially display 100 tokens
      setFilteredTokens(data.slice(0, 6)); // Set filtered tokens to display initially
    };
    fetchTokens();

    setBalance(20000); // Placeholder balance for the user
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

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

    const totalCost = selectedToken.current_price * amount;
    setPurchasedTokens((prevTokens) => [
      ...prevTokens,
      { token: selectedToken, amount: parseFloat(amount), purchasePrice: selectedToken.current_price },
    ]);
    setBalance((prevBalance) => prevBalance - totalCost);

    setLoading(false);
    setIsModalOpen(false);
    setAmount('');
    setSelectedToken(null);
  };

  return (
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
        <button className="hamburger fixed top-4 left-4 text-white text-2xl" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mt-20 mb-4">Your Dashboard</h1>

        {/* Portfolio Overview */}
        <div className="border p-6 mb-6 rounded-lg bg-white shadow-lg">
          <h2 className="font-bold text-2xl text-gray-700 mb-2">Portfolio Overview</h2>
          <p className="text-lg text-gray-600">
            Total Balance: <span className="font-semibold text-blue-500">${balance.toLocaleString()}</span>
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
          {/* Bitcoin Balance Card */}
          <div className="card bg-green-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Bitcoin Balance</h2>
            <p>$20,000</p>
            <button
              className="bg-white text-green-500 py-2 px-4 rounded-lg mt-4 hover:bg-gray-100 transition-all duration-300"
              onClick={() => { setDepositToken('bitcoin'); setIsDepositModalOpen(true); }} // Open deposit modal for Bitcoin
            >
              Deposit Bitcoin
            </button>
          </div>

          {/* Ethereum Balance Card */}
          <div className="card bg-blue-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Ethereum Balance</h2>
            <p>$30.00</p>
            <button
              className="bg-white text-blue-500 py-2 px-4 rounded-lg mt-4 hover:bg-gray-100 transition-all duration-300"
              onClick={() => { setDepositToken('ethereum'); setIsDepositModalOpen(true); }} // Open deposit modal for Ethereum
            >
              Deposit Ethereum
            </button>
          </div>

          {/* Solana Balance Card */}
          <div className="card bg-purple-500 text-white p-4 rounded-lg">
            <h2 className="font-bold">Solana Balance</h2>
            <p>$0.00</p>
            <button
              className="bg-white text-purple-500 py-2 px-4 rounded-lg mt-4 hover:bg-gray-100 transition-all duration-300"
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

        {/* Investment History */}
        <div className="investment-history mt-6">
          <h2 className="font-bold text-xl text-gray-800 mb-4">Your Investments</h2>
          {purchasedTokens.length === 0 ? (
            <p>No investments yet.</p>
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

        {/* Token List */}
        <div className="token-list mt-6">
          <h2 className="font-bold text-xl text-gray-800 mb-4">Available Tokens</h2>
          <input
            type="text"
            placeholder="Search Tokens..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded mb-4 w-full"
          />

          {/* Token Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
            {filteredTokens.map((token) => (
              <div key={token.id} className="border rounded-lg p-4 bg-white shadow">
                <h3 className="font-bold text-lg">{token.name}</h3>
                <p>Current Price: ${token.current_price}</p>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
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
        </div>

        {/* Buy Token Modal */}
        {isModalOpen && (
          <div className="modal-overlay fixed inset-0   flex items-center justify-center">
            <div className="modal bg-white p-16 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Buy {selectedToken.name}</h2>
              <p className="mb-4">Current Price: ${selectedToken.current_price}</p>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
              />
              <button
                className={`bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleBuyToken}
                disabled={loading}
              >
                {loading ? 'Buying...' : 'Buy'}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 ml-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedToken(null);
                  setAmount('');
                }}
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
