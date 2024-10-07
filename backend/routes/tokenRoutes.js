// routes/tokenRoutes.js
const express = require('express');
const { addToken, getUserTokens } = require('../controllers/tokenController');
const router = express.Router();

router.post('/add', addToken);
router.get('/:userId', getUserTokens);

module.exports = router;
