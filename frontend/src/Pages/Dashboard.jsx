import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tokens, setTokens] = useState([]);
  const [balance, setBalance] = useState(0); // Placeholder for user balance

  useEffect(() => {
    // Fetch placeholder token data (could be from an API like coingecko or from your backend)
    const fetchTokens = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      setTokens(data);
    };

    fetchTokens();

    // Placeholder balance for the user (you can later fetch this from your backend)
    setBalance(1000); // Placeholder balance, can be updated dynamically.
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>
      
      {/* Portfolio Overview */}
      <div className="border p-6 mb-6 rounded-lg bg-white shadow-lg">
        <h2 className="font-bold text-2xl text-gray-700 mb-2">Portfolio Overview</h2>
        <p className="text-lg text-gray-600">Total Balance: <span className="font-semibold text-blue-500">${balance.toFixed(2)}</span></p>
      </div>

      {/* Live Cryptocurrency Prices */}
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Live Cryptocurrency Prices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tokens.map((token) => (
          <div key={token.id} className="border bg-white rounded p-4 shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <h2 className="font-bold text-gray-800 mb-2">{token.name} ({token.symbol.toUpperCase()})</h2>
            <p className="text-gray-600">Price: <span className="font-semibold text-blue-500">${token.current_price.toFixed(2)}</span></p>
            <p className="text-gray-600">Market Cap: <span className="font-semibold">${token.market_cap.toLocaleString()}</span></p>
            <p className={token.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}>
              24h Change: {token.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>

      {/* Your Investments */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Investments</h2>
        <div className="border p-6 bg-white rounded-lg shadow-lg text-center">
          <p className="text-lg text-gray-600 mb-4">You have no investments yet.</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            Buy Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
