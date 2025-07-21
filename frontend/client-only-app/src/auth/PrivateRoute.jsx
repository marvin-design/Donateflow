// src/auth/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // No token - redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Has token but wrong role - redirect to unauthorized
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized - render child routes
  return <Outlet />;
};

export default PrivateRoute;