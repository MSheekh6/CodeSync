const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const roomManager = require('./utils/roomManager');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
const allowGuests = process.env.ALLOW_GUESTS !== 'false';

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());
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
app.use('/api/auth', authRoutes);

function getSocketToken(socket) {
  const cookieHeader = socket.handshake.headers.cookie || '';
  const tokenCookie = cookieHeader.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith('token='));
  return tokenCookie ? decodeURIComponent(tokenCookie.slice('token='.length)) : socket.handshake.auth?.token;
}

io.use((socket, next) => {
  const token = getSocketToken(socket);
  if (token && process.env.JWT_SECRET) {
    try {
      const identity = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.userId = identity.id;
      socket.data.username = identity.username;
      socket.data.isGuest = false;
      return next();
    } catch (error) {
      if (!allowGuests) return next(new Error('unauthorized'));
    }
  }

  if (!allowGuests) return next(new Error('unauthorized'));
  socket.data.userId = `guest-${socket.id}`;
  socket.data.username = `Guest-${Math.floor(1000 + Math.random() * 9000)}`;
  socket.data.isGuest = true;
  return next();
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  let currentRoom = null;

  // Join room event
  socket.on('join-room', (payload = {}) => {
    try {
      const { roomId } = payload;
      if (typeof roomId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(roomId)) {
        return socket.emit('socket-error', { error: 'Invalid room ID.' });
      }
      console.log(`\n🔔 Join room request: ${roomId} by ${socket.data.username}`);

      if (currentRoom) {
        const previousRoom = currentRoom;
        socket.leave(currentRoom);
        roomManager.leaveRoom(currentRoom, socket.id);
        io.to(previousRoom).emit('presence-update', roomManager.getPresence(previousRoom));
      }

      socket.join(roomId);
      currentRoom = roomId;

      const result = roomManager.joinRoom(roomId, socket.id, {
        userId: socket.data.userId,
        username: socket.data.username,
        isGuest: socket.data.isGuest
      });

      socket.emit('room-joined', result.room);
      io.to(roomId).emit('presence-update', roomManager.getPresence(roomId));

      console.log(`✅ ${socket.data.username} successfully joined ${roomId}\n`);
    } catch (error) {
      console.error('Join room failed:', error.message);
      socket.emit('socket-error', { error: 'Unable to join room.' });
    }
  });

  // Code change event
  socket.on('code-change', (payload = {}) => {
    try {
      const { roomId, fileName, code } = payload;
      if (roomId !== currentRoom || typeof fileName !== 'string' || typeof code !== 'string') return;
      if (roomManager.updateCode(roomId, fileName, code)) {
        socket.to(roomId).emit('code-update', { fileName, code });
      }
    } catch (error) {
      console.error('Code change failed:', error.message);
    }
  });

  // Leave room event
  socket.on('leave-room', () => {
    if (currentRoom) {
      const result = roomManager.leaveRoom(currentRoom, socket.id);
      
      socket.leave(currentRoom);
      io.to(currentRoom).emit('presence-update', roomManager.getPresence(currentRoom));
      currentRoom = null;
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);

    if (currentRoom) {
      const result = roomManager.leaveRoom(currentRoom, socket.id);
      
      io.to(currentRoom).emit('presence-update', roomManager.getPresence(currentRoom));
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
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((error) => console.error('❌ MongoDB connection failed:', error.message));
} else {
  console.warn('⚠️ MONGODB_URI is not configured; authentication routes require MongoDB');
}

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
