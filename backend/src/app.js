const path = require('path');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Unknown API route
app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found' }));

// Serve the frontend from the same server (no CORS issues)
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

app.use(errorHandler);

module.exports = app;
