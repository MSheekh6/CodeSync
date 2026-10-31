import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <span className="footer-brand-mark">&lt;&gt;</span>
            <span>CodeSync</span>
          </Link>
          <p>Build together in the same tab, with live code and preview side by side.</p>
        </div>
        <div>
          <h2>Product</h2>
          <a href="/#features">Features</a>
          <a href="/#how-it-works">How it works</a>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <h2>Resources</h2>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/#how-it-works">Getting started</a>
          <a href="/#features">Updates</a>
        </div>
        <div>
          <h2>Legal</h2>
          <a href="/#">Privacy</a>
          <a href="/#">Terms</a>
          <a href="/#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CodeSync</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="CodeSync on GitHub">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7c.85 0 1.7.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
