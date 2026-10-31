import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading">Checking your session…</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export default PublicOnlyRoute;
