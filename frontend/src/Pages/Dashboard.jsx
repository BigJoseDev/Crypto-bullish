import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCopy } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TokenDetailsModal from "../Components/TokenDetailsModal";
import TokenChart from "../Components/TokenChart";
// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Handle opening the modal and setting the selected token
  const handleViewDetails = (token) => {
    setSelectedToken(token);
    setIsModalO(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalO(false);
    setSelectedToken(null)
  };
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState({
    bitcoin: 0,
    ethereum: 0,
    solana: 0,
  }); // Modified to store individual balances
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalO, setIsModalO] = useState(false);
  const [purchasedTokens, setPurchasedTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState("");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false); // State for deposit modal
  const [depositToken, setDepositToken] = useState(null); // State for the token to be deposited
  const [paymentMethod, setPaymentMethod] = useState("bitcoin"); // State for the payment method
  const [copied, setCopied] = useState(false);
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);

  const walletAddresses = {
    bitcoin: "37JFt45q7y9w2EPfQuCPhRLH2eo9Gtbuor", // Your Bitcoin wallet address
    ethereum: "0x13cebedcE02D38B2d62D1721971dd9c76bc45Fe5", // Replace with your Ethereum wallet address
    solana: "7Z7pUSQMKBSdxbt8hxMbZXqDUqY5oVNnaGY7UdXAQr5J", // Replace with your Solana wallet address
  };

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
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
    labels: ["24h Low", "24h High"],
    datasets: [
      {
        label: `${token.name} Price`,
        data: [token.low_24h, token.high_24h],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 3,
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const handleBuyToken = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const totalCost = selectedToken.current_price * amount;
    const currentBalance = balance[paymentMethod];

    if (totalCost > currentBalance) {
      alert("Insufficient balance for this transaction.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulated delay

    setPurchasedTokens((prevTokens) => [
      ...prevTokens,
      {
        token: selectedToken,
        amount: parseFloat(amount),
        purchasePrice: selectedToken.current_price,
      },
    ]);

    setBalance((prevBalance) => ({
      ...prevBalance,
      [paymentMethod]: prevBalance[paymentMethod] - totalCost, // Deduct from the selected payment method
    }));

    setLoading(false);
    setIsModalOpen(false);
    setAmount("");
    setSelectedToken(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddresses[depositToken]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset after 2 seconds
  };
  const handleConfirmDeposit = () => {
    setIsDepositConfirmed(true);
    setTimeout(() => {
      alert(
        "Deposit confirmed successfully! your wallet will be funded shortly."
      );
      setIsDepositModalOpen(false);
      setIsDepositConfirmed(false); // Reset after confirmation
    }, 20000); // Simulate a small delay before confirming
  };
  return (
    <>
      <div className="dashboard-container flex">
        {/* Sidebar */}
        <div
          className={`sidebar ${
            isSidebarOpen ? "open" : "closed"
          } bg-gray-900 text-white fixed top-0 left-0 h-full transition-all duration-300`}
        >
          <div className="sidebar-header flex justify-between items-center p-4">
            <button onClick={toggleSidebar} className="sidebar-close-btn">
              <FaTimes />
            </button>
          </div>
          <ul className="sidebar-links">
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>

            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              Deposit History
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Withdrawal</li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">Account</li>
            <li>
              <Link
                to="/"
                className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          className={`main-content ${
            isSidebarOpen ? "shrink" : "expand"
          } ml-64 transition-all duration-300 p-6 bg-gray-200 min-h-screen`}
        >
          <button
            className="hamburger fixed top-4 left-4 text-white text-2xl"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-6 font-serif transition-transform ">
            Your Dashboard
          </h1>

          {/* Portfolio Overview */}
          <div className="border p-6 mb-6 rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out  ">
            <h2 className="font-bold text-3xl text-white mb-4 font-serif tracking-wide transition-all duration-300 ease-in-out animate-fadeInLine delay-500  ">
              Hello, Investor
            </h2>

            <p className="text-lg text-gray-300 font-semibold mb-6 transition-all duration-300 ease-in-out animate-fadeInLine delay-200 ">
              Wallet Balance:{" "}
              <span className="font-extrabold text-gray-200">
                ${""}
                {Object.values(balance)
                  .reduce((acc, val) => acc + val, 0)
                  .toLocaleString()}
              </span>
            </p>

            {/* Button or additional interaction */}
            <button className="mt-4 bg-gray-900 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:bg-gray-900 hover:scale-105">
              View Details
            </button>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
            {/* Bitcoin Balance Card */}
            <div className="card bg-gradient-to-r from-gray-400 to-gray-500 text-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
              <h2 className="font-bold font-serif text-xl mb-2">
                Bitcoin Balance
              </h2>
              <p className="text-lg font-semibold mb-4">
                ${balance.bitcoin.toLocaleString()}
              </p>
              <button
                className="bg-white text-gray-800 py-2 px-6 rounded-lg mt-4 font-serif hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {
                  setDepositToken("bitcoin");
                  setIsDepositModalOpen(true);
                }} // Open deposit modal for Bitcoin
              >
                Deposit Bitcoin
              </button>
            </div>

            {/* Ethereum Balance Card */}
            <div className="card bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
              <h2 className="font-bold font-serif text-xl mb-2">
                Ethereum Balance
              </h2>
              <p className="text-lg font-semibold mb-4">
                ${balance.ethereum.toLocaleString()}
              </p>
              <button
                className="bg-white text-indigo-800 py-2 px-6 rounded-lg mt-4 font-serif hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {
                  setDepositToken("ethereum");
                  setIsDepositModalOpen(true);
                }} // Open deposit modal for Ethereum
              >
                Deposit Ethereum
              </button>
            </div>

            {/* Solana Balance Card */}
            <div className="card bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out">
              <h2 className="font-bold font-serif text-xl mb-2">
                Solana Balance
              </h2>
              <p className="text-lg font-semibold mb-4">
                ${balance.solana.toLocaleString()}
              </p>
              <button
                className="bg-white text-teal-800 py-2 px-6 rounded-lg mt-4 font-serif hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => {
                  setDepositToken("solana");
                  setIsDepositModalOpen(true);
                }} // Open deposit modal for Solana
              >
                Deposit Solana
              </button>
            </div>
          </div>

          {/* Deposit Modal */}
          {isDepositModalOpen && (
            <div className="modal-overlay fixed inset-13 flex items-center justify-center">
              <div className="modal bg-white p-20  rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">
                  Deposit{" "}
                  {depositToken.charAt(0).toUpperCase() + depositToken.slice(1)}
                </h2>
                <p className="text-gray-600 mb-4">
                  Send{" "}
                  {depositToken.charAt(0).toUpperCase() + depositToken.slice(1)}{" "}
                  to your wallet address below:
                </p>
                <QRCode
                  value={walletAddresses[depositToken]}
                  size={150}
                  className="mb-4  mx-auto"
                />
                <div className="flex items-center justify-center">
                  <p className="text-center break-words text-sm md:text-lg lg:text-xl mr-2 mb-4">
                    {walletAddresses[depositToken]}
                  </p>
                  <button onClick={handleCopy} className="ml-2 text-gray-600">
                    <FaCopy className="text-xl cursor-pointer" />
                  </button>
                </div>
                {copied && <p className="text-green-500">Copied!</p>}
                {/* Deposit Confirmation Button */}
                <button
                  onClick={handleConfirmDeposit}
                  className={`mt-4 bg-gray-500 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 ${
                    isDepositConfirmed ? "animate-pulse" : ""
                  }`}
                  disabled={isDepositConfirmed}
                >
                  {isDepositConfirmed
                    ? "Confirming..."
                    : "Click here after deposit"}
                </button>

                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 ml-3"
                  onClick={() => setIsDepositModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Token Purchase Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-600 text-white font-serif py-2 px-4 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Buy Tokens
            </button>
          </div>

          {/* Buy Token Modal */}
          {isModalOpen && (
            <div className="modal-overlay fixed inset-0 flex items-center justify-center">
              <div className="modal bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold font-serif">Buy Tokens</h2>
                <select
                  value={selectedToken?.id}
                  onChange={(e) =>
                    setSelectedToken(
                      tokens.find((token) => token.id === e.target.value)
                    )
                  }
                >
                  <option value="">Select Token</option>
                  {filteredTokens.map((token) => (
                    <option key={token.id} value={token.id}>
                      {token.name}
                    </option>
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
                      checked={paymentMethod === "bitcoin"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="bitcoin" className="ml-2 font-serif">
                      Bitcoin
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="ethereum"
                      name="paymentMethod"
                      value="ethereum"
                      checked={paymentMethod === "ethereum"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="ethereum" className="ml-2 font-serif">
                      Ethereum
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="solana"
                      name="paymentMethod"
                      value="solana"
                      checked={paymentMethod === "solana"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="solana" className="ml-2 font-serif">
                      Solana
                    </label>
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
                  onClick={handleBuyToken}
                  disabled={loading}
                >
                  {loading ? "Buying..." : "Buy Token"}
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-7 rounded-lg ml-2 mt-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Purchased Tokens Section */}
          <div className="investment-history mt-6 ">
            {/* <h2 className="font-bold text-xl text-gray-800 mb-4 font-serif">Your Assets</h2> */}
            {purchasedTokens.length === 0 ? (
              <p className="font-serif"></p>
            ) : (
              purchasedTokens.map((investment, index) => (
                <div
                  key={index}
                  className="investment-card border rounded-lg p-4 mb-4 bg-white shadow"
                >
                  <h3 className="font-bold">{investment.token.name}</h3>
                  <p>Amount: {investment.amount}</p>
                  <p>Purchased Price: ${investment.purchasePrice}</p>
                  <p>
                    Current Value: $
                    {investment.amount * investment.token.current_price}
                  </p>
                </div>
              ))
            )}
                    
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif transition-all duration-300 ease-in-out">
              Available Tokens
            </h2>

            <input
              type="text"
              className="border border-gray-300 p-3 rounded-lg w-full mb-6 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Search for a token..."
              value={searchQuery}
              onChange={handleSearch}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTokens.map((token) => (
                <div
                  key={token.id}
                  className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300"
                >
                  {/* Token Header with Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Token Icon */}
                      <img
                        src={token.image} // Ensure you have `icon` as a property in the `token` object
                        alt={token.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <h3 className="font-semibold text-lg text-gray-800">
                        {token.name}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Token Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-sm">Price:</span>
                    <span className="font-bold text-gray-900">
                      ${token.current_price.toLocaleString()}
                    </span>
                  </div>

                  {/* 24-Hour Change */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-sm">24h Change:</span>
                    <span
                      className={`font-bold ${
                        token.price_change_percentage_24h > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {token.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 transition-all"
                    onClick={() => handleViewDetails(token)} // Trigger view details
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Token Details Modal */}
            {isModalO &&  (
  <TokenDetailsModal
    token={selectedToken}
    show={isModalO}
    onClose={handleCloseModal}
  />
)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
