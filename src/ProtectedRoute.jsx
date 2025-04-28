import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  
  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → allow access
  return <Outlet />;
};

export default ProtectedRoute;
