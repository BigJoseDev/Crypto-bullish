import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TokenDetailsModal = ({ token, show, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [tokenHistory, setTokenHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (show && token?.id) {
      setLoading(true);
      setError('');

      // Fetch data from CoinGecko API
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${token.id}/market_chart`, {
          params: {
            vs_currency: 'usd', // USD currency
            days: '7',           // 7 days of historical data
          },
        })
        .then((response) => {
          const fetchedData = response.data;
          if (fetchedData && fetchedData.prices) {
            // Format data for the chart
            const formattedHistory = fetchedData.prices.map(([timestamp, value]) => ({
              date: new Date(timestamp).toLocaleTimeString(), // Show time for 7 days data
              value,
            }));
            setTokenHistory(formattedHistory);
          } else {
            setError('Invalid data format received.');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching token history:', error);
          setError('Error fetching token history.');
          setLoading(false);
        });
    }
  }, [show, token]);

  if (!show || !token) return null;

  const currentPrice = token.current_price ? token.current_price.toLocaleString() : 'Loading...';
  const priceChange = token.price_change_percentage_24h
    ? token.price_change_percentage_24h.toFixed(2)
    : 'N/A';

  const chartData = {
    labels: tokenHistory.map(entry => entry.date), // Time labels (7 days)
    datasets: [
      {
        label: 'Price History (USD)',
        data: tokenHistory.map(entry => entry.value),
        borderColor: '#4CAF50', // Green line color
        backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green fill under the line
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      
      
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50   ">
      <div className="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{token.name}</h2>
          <button
            className="text-gray-500 text-2xl font-bold hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Price and 24h Change */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-lg text-gray-600">Current Price</p>
            <p className="text-xl font-bold text-gray-900">${currentPrice}</p>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg text-gray-600">24h Change</p>
            <p
              className={`text-xl font-bold ${priceChange > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {priceChange}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="my-3 h-[60vh] w-full">
          {loading ? (
            <div className="text-center text-gray-500">Loading token history...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="w-full h-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-lg w-full sm:w-auto sm:ml-auto sm:mb-0 transition duration-200 hover:bg-red-600 "
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TokenDetailsModal;
