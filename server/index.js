const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'CodeSync API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Import routes
const codeRoutes = require('./routes/code');
const roomRoutes = require('./routes/rooms');

// Use routes
app.use('/api/code', codeRoutes);
app.use('/api/rooms', roomRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 API Routes:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/code`);
  console.log(`   - POST /api/code`);
  console.log(`   - GET  /api/rooms`);
  console.log(`   - POST /api/rooms`);
});
