import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const createRoom = () => navigate(`/room/${nanoid(9)}`);
  const joinRoom = (event) => {
    event.preventDefault();
    const trimmedRoomId = roomId.trim();
    if (!trimmedRoomId) {
      setError('Enter a room ID to join.');
      return;
    }
    navigate(`/room/${encodeURIComponent(trimmedRoomId)}`);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading"><span className="eyebrow">Your workspace</span><h1>Welcome back, {user.username}</h1><p>Start a room or jump back into a shared project.</p></div>
      <div className="dashboard-cards">
        <article className="dashboard-card"><span className="feature-icon">＋</span><h2>Create a new room</h2><p>Open a fresh collaborative editor and invite your team.</p><button className="button button-primary" type="button" onClick={createRoom}>Create room</button></article>
        <article className="dashboard-card"><span className="feature-icon">↗</span><h2>Join a room</h2><p>Enter a room ID from a teammate to keep building.</p><form className="dashboard-join" onSubmit={joinRoom}><label className="sr-only" htmlFor="dashboard-room">Room ID</label><input id="dashboard-room" placeholder="Room ID" value={roomId} onChange={(event) => { setRoomId(event.target.value); setError(''); }} /><button className="button button-secondary" type="submit">Join</button></form>{error && <span className="form-error" role="alert">{error}</span>}</article>
      </div>
      <section className="projects-section"><div><span className="eyebrow">Projects</span><h2>Your projects</h2></div><div className="empty-projects"><p>No saved projects yet. Create a room to get started.</p><Link className="button button-secondary" to="/">Explore features</Link></div></section>
    </div>
  );
}

export default DashboardPage;
