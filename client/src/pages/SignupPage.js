import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthProviders from '../components/AuthProviders';
import LogoMark from '../components/LogoMark';

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!/^[A-Za-z0-9_]{3,20}$/.test(form.username)) return setError('Username must be 3-20 characters using only letters, numbers, and underscores.');
    if (!form.email.trim() || form.password.length < 8) return setError('Enter a valid email and a password of at least 8 characters.');
    setSubmitting(true);
    try {
      await signup(form);
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProviderClick = (provider) => {
    setError(`${provider} sign-in is not connected yet. Use email and password for now.`);
  };

  return (
    <div className="auth-page"><form className="auth-card" onSubmit={submit}>
      <LogoMark className="auth-logo" />
      <span className="eyebrow">Start building</span><h1>Create your account</h1><p>Save your rooms and keep your ideas moving.</p>
      <label htmlFor="signup-username">Username</label><input id="signup-username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} autoComplete="username" />
      <label htmlFor="signup-email">Email</label><input id="signup-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" />
      <label htmlFor="signup-password">Password</label><div className="password-field"><input id="signup-password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="new-password" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div>
      {error && <div className="form-error" role="alert" aria-live="polite">{error}</div>}
      <button className="button button-primary auth-submit" disabled={submitting} type="submit">{submitting ? 'Creating account…' : 'Create account'}</button>
      <AuthProviders onProviderClick={handleProviderClick} />
      <span className="auth-switch">Already have an account? <Link to="/login">Log in</Link></span>
    </form></div>
  );
}

export default SignupPage;
