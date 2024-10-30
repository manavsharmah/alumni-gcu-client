import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../services/UserContext';

export const PublicRoute = ({ element }) => {
  const { user } = useUser();
  
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  
  return element;
};