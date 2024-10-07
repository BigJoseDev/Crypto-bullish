// controllers/tokenController.js
const Token = require('../models/Token');

// Add Token
exports.addToken = async (req, res) => {
  const { userId, tokenName, amount, currentPrice } = req.body;

  try {
    const newToken = await Token.create({ userId, tokenName, amount, currentPrice });
    res.status(201).json(newToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User Tokens
exports.getUserTokens = async (req, res) => {
  const userId = req.params.userId;

  try {
    const tokens = await Token.find({ userId });
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
