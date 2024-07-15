import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import checkAuth from '../services/checkAuth';

const ProtectedRoute = ({ element, requiredRoles }) => {
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

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Check if user has any of the required roles
    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default ProtectedRoute;
