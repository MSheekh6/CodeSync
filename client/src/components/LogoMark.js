function LogoMark({ className = 'logo-mark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 8 6 16l6 8M20 8l6 8-6 8" />
      <circle cx="16" cy="16" r="2.5" />
    </svg>
  );
}

export default LogoMark;
