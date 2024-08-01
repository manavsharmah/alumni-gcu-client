import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
            try {
                const res = await api.get('/user/user');
                if (res && res.data) {
                    setUser(res.data);
                }
            } catch (err) {
                console.error('Error during HTTP request:', err);
            } 
        }
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', credentials); 
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
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

    
