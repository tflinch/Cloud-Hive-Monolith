// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a spinner
  if (!user) {
    // send them to login and remember where they wanted to go
    return <Navigate to='/login' replace state={{ from: location }} />;
  }
  return <Outlet />;
}
