class RoomManager {
  constructor() {
    this.rooms = new Map(); // roomId -> { users: Map, code: { html, css, js } }
  }

  createRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        users: new Map(), // socketId -> { username, joinedAt }
        code: {
          html: '<h1>Welcome to CodeSync!</h1>\n<p>Start coding together.</p>',
          css: 'body {\n  font-family: Arial, sans-serif;\n  padding: 20px;\n}',
          js: '// Write your JavaScript here\nconsole.log("Room created!");'
        },
        createdAt: new Date()
      });
      console.log(`📁 Room created: ${roomId}`);
    }
    return this.rooms.get(roomId);
  }

  joinRoom(roomId, socketId, username) {
    let room = this.rooms.get(roomId);
    
    // Create room if it doesn't exist
    if (!room) {
      room = this.createRoom(roomId);
    }

    // Add user to room
    room.users.set(socketId, {
      username,
      joinedAt: new Date()
    });

    console.log(`👤 ${username} (${socketId}) joined room: ${roomId}`);
    console.log(`   Users in room: ${room.users.size}`);

    return {
      success: true,
      room: {
        roomId,
        code: room.code,
        users: Array.from(room.users.values()).map(u => u.username),
        userCount: room.users.size
      }
    };
  }

  leaveRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const user = room.users.get(socketId);
    if (user) {
      room.users.delete(socketId);
      console.log(`👋 ${user.username} left room: ${roomId}`);
      console.log(`   Users remaining: ${room.users.size}`);

      // Delete room if empty
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
        console.log(`🗑️  Room deleted (empty): ${roomId}`);
      }

      return {
        username: user.username,
        userCount: room.users.size
      };
    }

    return null;
  }

  updateCode(roomId, language, code) {
    const room = this.rooms.get(roomId);
    if (!room) return false;

    if (language === 'html' || language === 'css' || language === 'js') {
      room.code[language] = code;
      return true;
    }

    return false;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getRoomUsers(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    
    return Array.from(room.users.values()).map(u => u.username);
  }

  getRoomStats() {
    return {
      totalRooms: this.rooms.size,
      rooms: Array.from(this.rooms.entries()).map(([roomId, room]) => ({
        roomId,
        userCount: room.users.size,
        users: Array.from(room.users.values()).map(u => u.username),
        createdAt: room.createdAt
      }))
    };
  }
}

module.exports = new RoomManager();
