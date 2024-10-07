// models/Token.js
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tokenName: { type: String, required: true },
  amount: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
