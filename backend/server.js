const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Database connection — credentials passed separately to avoid URI encoding issues
const mongoHost = process.env.MONGO_HOST;
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

mongoose.connect(mongoHost, {
  auth: {
    username: mongoUser,
    password: mongoPass
  },
  authSource: 'admin'
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
