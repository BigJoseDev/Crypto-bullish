import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TokenChart = ({ data }) => {
  // Data for the chart
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Price History (USD)',
        data: data.map(entry => entry.value),
        borderColor: '#4CAF50', // Green line color
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TokenChart;
