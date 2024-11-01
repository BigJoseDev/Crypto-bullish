const express = require('express');
const connectDB = require('./Config/db');
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Determine allowed origin based on environment
const allowedOrigins = [
  'https://www.panteraetf.com',  // Production
  'http://localhost:5173'        // Local development
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tokens', tokenRoutes);

// Start the server
const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
