import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function RoomPage() {
  const { roomId } = useParams();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const activeUsername = user?.username || 'Guest';

  const copyInvite = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <span className="username">👤 {activeUsername}</span>
          {user && <Link className="room-dashboard-link" to="/dashboard">Dashboard</Link>}
          <button className="button button-secondary button-small" type="button" onClick={copyInvite}>{copied ? 'Copied' : 'Copy invite link'}</button>
        </div>
      </header>
      <main className="main-content">
        <CodeEditor roomId={roomId} username={activeUsername} />
      </main>
    </div>
  );
}

export default RoomPage;
