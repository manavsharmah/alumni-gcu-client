import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/user/user');
                if (res && res.data) {
                    setUser(res.data);
                }
            } catch (err) {
                console.error('Error during HTTP request:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const res = await api.post('/auth/login', credentials); 
            if (res && res.data) {
                setUser(res.data.user); 
                localStorage.setItem('accessToken', res.data.accessToken); //storing in localstorage
            }
        } catch (err) {
            console.error('Error during login:', err);
            throw err; 
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null); //clearing the user state on logout
            localStorage.removeItem('accessToken'); //removing the token from local storage
            window.location.reload(); //reloading the page to reset userstate
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

    
