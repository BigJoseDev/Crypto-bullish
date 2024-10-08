// BuyTokens.js
import React, { useEffect, useState } from 'react';

const BuyTokens = ({ closeModal }) => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const data = await response.json();
      setTokens(data);
    };
    fetchTokens();
  }, []);

  const handleBuyToken = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    // Simulate an API call to buy the token
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
    alert(`Successfully purchased ${amount} of ${selectedToken.name}!`);
    
    setLoading(false);
    closeModal(); // Close modal after purchase
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Buy Tokens</h2>
        <div>
          <label className="block mb-2" htmlFor="token">Select Token:</label>
          <select
            id="token"
            className="border p-2 w-full mb-4"
            onChange={(e) => setSelectedToken(JSON.parse(e.target.value))}
          >
            <option value="">Select a token</option>
            {tokens.map(token => (
              <option key={token.id} value={JSON.stringify(token)}>{token.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2" htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            onClick={handleBuyToken}
            disabled={loading}
          >
            {loading ? 'Buying...' : 'Buy Token'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyTokens;
