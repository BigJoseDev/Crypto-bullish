import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BuyToken = ({ closeModal, updateBalances }) => {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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

    const cost = selectedToken.current_price * amount;

    // Simulate an API call to buy the token
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/tokens/add', {
        tokenName: selectedToken.name,
        amount: amount,
        currentPrice: selectedToken.current_price,
      });

      // Update the user's balances after the purchase
      updateBalances(selectedToken.name.toLowerCase(), cost);
      setSuccessMessage(`Successfully purchased ${amount} of ${selectedToken.name} for $${cost.toFixed(2)}!`);
      setTimeout(() => {
        closeModal();
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('An error occurred while purchasing the token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Buy Tokens</h2>
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <label className="block mb-2">Select Token:</label>
        <select onChange={(e) => setSelectedToken(tokens.find(token => token.name === e.target.value))}>
          <option value="">Choose a token</option>
          {tokens.map(token => (
            <option key={token.id} value={token.name}>{token.name}</option>
          ))}
        </select>
        {selectedToken && (
          <>
            <p className="mt-4">Current Price: ${selectedToken.current_price}</p>
            <label className="block mt-4 mb-2">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full"
            />
            <button
              onClick={handleBuyToken}
              className={`mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Buying...' : 'Buy Token'}
            </button>
          </>
        )}
        <button onClick={closeModal} className="mt-4 text-red-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BuyToken;
