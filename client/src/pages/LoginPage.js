import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthLogo() {
  return <svg className="auth-logo" viewBox="0 0 32 32" aria-hidden="true"><path d="M12 8 6 16l6 8M20 8l6 8-6 8" /><circle cx="16" cy="16" r="2.5" /></svg>;
}

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.email.trim() || !form.password) return setError('Email and password are required.');
    setSubmitting(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page"><form className="auth-card" onSubmit={submit}>
      <AuthLogo /><span className="eyebrow">Welcome back</span><h1>Welcome back</h1><p>Log in to continue building with your team.</p>
      <label htmlFor="login-email">Email</label><input id="login-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" />
      <label htmlFor="login-password">Password</label><div className="password-field"><input id="login-password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div>
      {error && <div className="form-error" role="alert" aria-live="polite">{error}</div>}
      <button className="button button-primary auth-submit" disabled={submitting} type="submit">{submitting ? 'Logging in…' : 'Log in'}</button>
      <span className="auth-switch">New to CodeSync? <Link to="/signup">Create an account</Link></span>
    </form></div>
  );
}

export default LoginPage;
