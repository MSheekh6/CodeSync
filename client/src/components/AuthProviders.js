function ProviderIcon({ provider }) {
  if (provider === 'Google') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.21c0-.72-.06-1.42-.2-2.08H12v3.94h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.25Z" /><path fill="#34A853" d="M12 21.67c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.04H3.27v2.53A9.74 9.74 0 0 0 12 21.67Z" /><path fill="#FBBC05" d="M6.51 13.74A5.86 5.86 0 0 1 6.2 12c0-.61.11-1.2.31-1.74V7.73H3.27A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.06 1.02 4.27l3.24-2.53Z" /><path fill="#EA4335" d="M12 6.22c1.43 0 2.71.49 3.72 1.46l2.78-2.78C16.84 3.31 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.73 5.4l3.24 2.53C7.29 7.94 9.45 6.22 12 6.22Z" /></svg>;
  }

  if (provider === 'Apple') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.05 12.54c-.02-2.25 1.84-3.34 1.93-3.39a4.15 4.15 0 0 0-3.27-1.77c-1.38-.14-2.7.82-3.4.82-.7 0-1.79-.8-2.94-.78a4.34 4.34 0 0 0-3.65 2.22c-1.57 2.72-.4 6.73 1.1 8.93.75 1.08 1.62 2.29 2.77 2.25 1.12-.05 1.54-.72 2.9-.72 1.35 0 1.73.72 2.91.7 1.2-.02 1.96-1.1 2.69-2.18a8.96 8.96 0 0 0 1.22-2.51 3.89 3.89 0 0 1-2.26-3.57ZM14.82 5.92a3.84 3.84 0 0 0 .88-2.75 3.9 3.9 0 0 0-2.56 1.32 3.64 3.64 0 0 0-.9 2.64 3.22 3.22 0 0 0 2.58-1.21Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1877F2" d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.03 3.66 9.2 8.44 9.93v-7.03H7.9v-2.9h2.54V9.86c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.73 8.44-4.9 8.44-9.93Z" /></svg>;
}

function AuthProviders({ onProviderClick }) {
  return (
    <div className="auth-providers" aria-label="Social sign-in options">
      <div className="auth-divider"><span>or continue with</span></div>
      <div className="provider-buttons">
        {['Google', 'Apple', 'Meta'].map((provider) => (
          <button className="provider-button" type="button" key={provider} onClick={() => onProviderClick(provider)}>
            <ProviderIcon provider={provider} />
            <span>{provider}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AuthProviders;
