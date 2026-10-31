import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import '../App.css';

function RoomPage() {
  const { roomId } = useParams();
  const [username, setUsername] = useState(() => sessionStorage.getItem('codesync-username') || '');
  const [nameInput, setNameInput] = useState('');

  const enterRoom = (event) => {
    event.preventDefault();
    const name = nameInput.trim();
    if (!name) return;
    sessionStorage.setItem('codesync-username', name);
    setUsername(name);
  };

  if (!username) {
    return (
      <div className="room-access">
        <form className="room-access-card" onSubmit={enterRoom}>
          <span className="eyebrow">Room ready</span>
          <h1>Choose a display name</h1>
          <p>Enter the room as a guest to start collaborating.</p>
          <label htmlFor="room-name">Display name</label>
          <input id="room-name" value={nameInput} onChange={(event) => setNameInput(event.target.value)} autoFocus required />
          <button className="button button-primary" type="submit">Enter room</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app room-app">
      <header className="header">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 4 4 8l4 4M16 4l4 4-4 4M14 4l-4 16" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1>CodeSync</h1>
        <div className="room-info">
          <span className="room-id">Room: {roomId}</span>
          <span className="username">👤 {username}</span>
        </div>
      </header>
      <main className="main-content">
        <CodeEditor roomId={roomId} username={username} />
      </main>
    </div>
  );
}

export default RoomPage;
