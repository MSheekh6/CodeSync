import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
  ['Real-time editing', 'One file, many cursors. Changes arrive as people make them—without a save, merge, or refresh.', false, '01'],
  ['Live preview', 'HTML, CSS, and JavaScript sit side by side. Test an idea while the rest of the room keeps moving.', true, '02'],
  ['Presence', 'A small, useful signal: who is here, what they are editing, and whether the room is active.', true, '03'],
  ['Shareable rooms', 'Send the room link. There is no workspace setup waiting on the other side.', false, '04'],
  ['Saved projects', 'Keep finished experiments close, ready to reopen when inspiration comes back.', true, '05'],
  ['Fork and remix', 'Take a working project in a new direction instead of starting from a blank page.', true, '06'],
];

function ScrollReveal({ children, className = '' }) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={elementRef} className={`${className} reveal ${visible ? 'is-visible' : ''}`}>{children}</div>;
}

function CodeMockup() {
  return (
    <div className="mockup-wrap">
      <div className="mockup-window">
        <div className="mockup-titlebar">
          <div className="window-dots"><i /><i /><i /></div>
          <span>codesync / shared-room</span>
          <div className="online-label"><b /> 2 online</div>
        </div>
        <div className="mockup-tabs"><span className="active">index.html</span><span>style.css</span><span>app.js</span></div>
        <div className="mockup-editor">
          <div className="line-numbers">1<br />2<br />3<br />4<br />5<br />6</div>
          <pre><code><em>&lt;main</em> <strong>className</strong>=<mark>"hero"</mark><em>&gt;</em>{'\n'}  <em>&lt;h1&gt;</em><span>Build together.</span><em>&lt;/h1&gt;</em>{'\n'}  <em>&lt;p&gt;</em><span>Ideas move faster live.</span><em>&lt;/p&gt;</em>{'\n'}  <em>&lt;button&gt;</em><span>Start building</span><em>&lt;/button&gt;</em>{'\n'}<em>&lt;/main&gt;</em></code></pre>
          <div className="remote-cursor cursor-one"><b>maya</b></div>
          <div className="remote-cursor cursor-two"><b>dev</b></div>
        </div>
        <div className="mockup-preview"><span>LIVE PREVIEW</span><div><h3>Build together.</h3><p>Ideas move faster live.</p><button>Start building</button></div></div>
      </div>
    </div>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [joinOpen, setJoinOpen] = useState(false);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
  }, []);

  const joinRoom = (event) => {
    event.preventDefault();
    if (roomId.trim()) navigate(`/room/${encodeURIComponent(roomId.trim())}`);
  };

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">A room for making things on the web</span>
            <h1>Make it together, <span>while it is live.</span></h1>
            <p>CodeSync is a shared scratchpad for HTML, CSS, and JavaScript. Open a room, bring a few people, and work on the same idea at the same time.</p>
            <div className="hero-actions">
              <Link className="button button-primary" to={user ? '/dashboard' : '/signup'}>{user ? 'Go to dashboard' : 'Start coding free'} <span>→</span></Link>
              <button className="button button-secondary" type="button" onClick={() => setJoinOpen((open) => !open)}>Join a room <span>↗</span></button>
            </div>
            {joinOpen && (
              <form className="join-inline" onSubmit={joinRoom}>
                <label className="sr-only" htmlFor="hero-room">Room ID</label>
                <input id="hero-room" placeholder="Enter a room ID" value={roomId} onChange={(event) => setRoomId(event.target.value)} autoFocus />
                <button className="button button-primary button-small" type="submit">Go</button>
              </form>
            )}
            <small className="hero-note">✦ No install. Share a link and code together.</small>
          </div>
          <CodeMockup />
        </div>
      </section>

      <ScrollReveal className="landing-section">
        <section className="container section-block" id="features">
          <div className="section-heading"><span className="eyebrow">Inside the room</span><h2>Enough to stay in flow.</h2><p>No sprawling toolkit. Just the pieces a small team needs to make and understand a web page together.</p></div>
          <div className="feature-grid">
            {features.map(([title, copy, comingSoon, icon], index) => (
              <article className={`feature-card feature-card-${index}`} key={title}>
                <div className="feature-icon">{icon}</div>
                <div className="feature-card-title"><h3>{title}</h3>{comingSoon && <span className="badge">Coming soon</span>}</div>
                <p>{copy}</p>
                {index === 0 && <div className="mini-presence"><span>maya</span><span>dev</span><span>sam</span></div>}
              </article>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="landing-section">
        <section className="container section-block" id="how-it-works">
          <div className="section-heading"><span className="eyebrow">Three short steps</span><h2>Open, invite, make.</h2></div>
          <div className="steps-grid">
            {[
              ['01', 'Create a room', 'Choose a room ID and open an editor in seconds.'],
              ['02', 'Send the link', 'Invite teammates with one shareable room link.'],
              ['03', 'Build together', 'Edit HTML, CSS, and JavaScript side by side.'],
            ].map(([number, title, copy]) => <article className="step-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>
      </ScrollReveal>

      <section className="container cta-panel"><span className="eyebrow">Bring one small idea</span><h2>See what it becomes with someone else in the room.</h2><Link className="button button-primary" to={user ? '/dashboard' : '/signup'}>{user ? 'Go to dashboard' : 'Create your free account'} <span>→</span></Link></section>
    </div>
  );
}

export default LandingPage;
