import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import checkAuth from '../services/checkAuth';

const ProtectedRoute = ({ element, requiredRole }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const { isAuthenticated, role } = await checkAuth();
                setIsAuthenticated(isAuthenticated);
                setUserRole(role);
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthStatus();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Display a loading message while checking auth status
    }

    if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;
