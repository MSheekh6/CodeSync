import { useState } from 'react';

function RoomJoin({ onJoinRoom }) {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }

    // Call parent function to join room
    onJoinRoom(roomId.trim(), username.trim());
  };

  const handleCreateRoom = () => {
    // Generate random room ID
    const newRoomId = 'room-' + Math.random().toString(36).substring(2, 9);
    setRoomId(newRoomId);
  };

  return (
    <div className="room-join-container">
      <div className="room-join-card">
        <div className="room-join-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M8 3L4 7L8 11" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 3L20 7L16 11" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="18" r="3" fill="#6c9eff"/>
          </svg>
          <h1>CodeSync</h1>
          <p>Real-time Collaborative Code Editor</p>
        </div>

        <form onSubmit={handleJoin} className="room-join-form">
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId">Room ID</label>
            <div className="room-id-input-group">
              <input
                id="roomId"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID or create new"
              />
              <button 
                type="button" 
                onClick={handleCreateRoom}
                className="btn-create-room"
              >
                Create New
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn-join">
            Join Room
          </button>
        </form>

        <div className="room-join-footer">
          <p>Enter an existing room ID or create a new room to start collaborating</p>
        </div>
      </div>
    </div>
  );
}

export default RoomJoin;
