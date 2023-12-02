const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const candidateRoutes = require('./routes/candidates');
const voteRoutes = require('./routes/votes');
const countRoutes = require('./routes/counts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/counts', countRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/votingApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Starting the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
