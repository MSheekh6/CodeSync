import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import RoomJoin from './components/RoomJoin';
import './App.css';

function App() {
  const [roomInfo, setRoomInfo] = useState(null);

  const handleJoinRoom = (roomId, username) => {
    console.log('Joining room:', roomId, 'as', username);
    setRoomInfo({ roomId, username });
  };

  const handleLeaveRoom = () => {
    setRoomInfo(null);
  };

  // Show room join screen if not in a room
  if (!roomInfo) {
    return <RoomJoin onJoinRoom={handleJoinRoom} />;
  }

  // Show editor once in a room
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L4 8L8 12" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 4L20 8L16 12" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 4L10 20" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="18" cy="18" r="4" fill="#6c9eff" opacity="0.3"/>
            <circle cx="18" cy="18" r="2" fill="#6c9eff"/>
          </svg>
        </div>
        <h1>CodeSync</h1>
        <div className="room-info">
          <span className="room-id">Room: {roomInfo.roomId}</span>
          <span className="username">👤 {roomInfo.username}</span>
          <button onClick={handleLeaveRoom} className="btn-leave">
            Leave Room
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <CodeEditor roomId={roomInfo.roomId} username={roomInfo.username} />
      </main>
    </div>
  );
}

export default App;
