import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../services/UserContext';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user } = useContext(UserContext);

  // Display a loading message while checking auth status
  if (!user) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user has any of the required roles
  if (requiredRole && requiredRole.length > 0 && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
