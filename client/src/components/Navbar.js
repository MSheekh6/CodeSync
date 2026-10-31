import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 8 6 16l6 8M20 8l6 8-6 8" />
      <circle cx="16" cy="16" r="2.5" />
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll('a, button');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const firstFocusable = menuRef.current?.querySelector('a, button');
    firstFocusable?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="CodeSync home">
          <LogoMark />
          <span>CodeSync</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link to="/#features">Features</Link>
          <Link to="/#how-it-works">How it works</Link>
        </nav>
        <div className="nav-actions desktop-nav">
          <Link className="button button-ghost" to="/login">Log in</Link>
          <Link className="button button-primary button-small" to="/signup">Sign up</Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <Link to="/#features">Features</Link>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/login">Log in</Link>
          <Link className="button button-primary" to="/signup">Sign up</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
