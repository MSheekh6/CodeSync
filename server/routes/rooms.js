const express = require('express');
const router = express.Router();

// GET all rooms
router.get('/', (req, res) => {
  res.json({ 
    message: 'Get all rooms',
    rooms: []
  });
});

// GET specific room by ID
router.get('/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.json({ 
    message: `Get room ${roomId}`,
    roomId: roomId,
    users: [],
    code: {
      html: '',
      css: '',
      js: ''
    }
  });
});

// POST create new room
router.post('/', (req, res) => {
  const roomId = 'room-' + Date.now();
  res.status(201).json({ 
    message: 'Room created',
    roomId: roomId,
    code: {
      html: '',
      css: '',
      js: ''
    }
  });
});

// PUT join room
router.put('/:roomId/join', (req, res) => {
  const { roomId } = req.params;
  const { userId, username } = req.body;
  res.json({ 
    message: `User ${username} joined room ${roomId}`,
    roomId: roomId,
    userId: userId
  });
});

module.exports = router;
