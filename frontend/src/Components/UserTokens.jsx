// src/components/UserTokens.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTokens = ({ userId }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tokens/${userId}`);
        setTokens(response.data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchUserTokens();
  }, [userId]);

  return (
    <div>
      <h2>Your Tokens</h2>
      <ul>
        {tokens.map(token => (
          <li key={token._id}>
            {token.tokenName}: {token.amount} @ ${token.currentPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTokens;
