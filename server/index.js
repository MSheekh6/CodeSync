const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

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

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Test event - echo back messages
  socket.on('test-message', (data) => {
    console.log('📨 Received test message:', data);
    socket.emit('test-response', { 
      message: 'Server received your message!',
      original: data,
      timestamp: Date.now()
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Start server (use server.listen for Socket.io)
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io ready for connections`);
  console.log(`📁 API Routes:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/code`);
  console.log(`   - POST /api/code`);
  console.log(`   - GET  /api/rooms`);
  console.log(`   - POST /api/rooms`);
});
