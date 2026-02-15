const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const roomManager = require('./utils/roomManager');

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

// Get room statistics
app.get('/api/rooms/stats', (req, res) => {
  res.json(roomManager.getRoomStats());
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

  let currentRoom = null;
  let currentUsername = null;

  // Join room event
  socket.on('join-room', ({ roomId, username }) => {
    console.log(`\n🔔 Join room request: ${roomId} by ${username}`);

    // Leave previous room if any
    if (currentRoom) {
      socket.leave(currentRoom);
      roomManager.leaveRoom(currentRoom, socket.id);
    }

    // Join new room
    socket.join(roomId);
    currentRoom = roomId;
    currentUsername = username;

    const result = roomManager.joinRoom(roomId, socket.id, username);

    // Send room data to user
    socket.emit('room-joined', result.room);

    // Notify others in room
    socket.to(roomId).emit('user-joined', {
      username,
      userCount: result.room.userCount,
      users: result.room.users
    });

    console.log(`✅ ${username} successfully joined ${roomId}\n`);
  });

  // Code change event
  socket.on('code-change', ({ roomId, language, code }) => {
    if (roomManager.updateCode(roomId, language, code)) {
      // Broadcast to others in room (not sender)
      socket.to(roomId).emit('code-update', {
        language,
        code,
        username: currentUsername
      });
    }
  });

  // Leave room event
  socket.on('leave-room', () => {
    if (currentRoom) {
      const result = roomManager.leaveRoom(currentRoom, socket.id);
      
      if (result) {
        socket.to(currentRoom).emit('user-left', {
          username: result.username,
          userCount: result.userCount
        });
      }

      socket.leave(currentRoom);
      currentRoom = null;
      currentUsername = null;
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);

    if (currentRoom) {
      const result = roomManager.leaveRoom(currentRoom, socket.id);
      
      if (result) {
        socket.to(currentRoom).emit('user-left', {
          username: result.username,
          userCount: result.userCount
        });
      }
    }
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
  console.log(`   - GET  /api/rooms/stats`);
  console.log(`   - GET  /api/code`);
  console.log(`   - POST /api/code`);
  console.log(`   - GET  /api/rooms`);
  console.log(`   - POST /api/rooms`);
});
