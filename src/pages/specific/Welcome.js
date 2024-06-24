import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
axios.defaults.withCredentials = true;

const Welcome = () => {
    const [user, setUser] = useState(null); // Initialize user to null
    
    const sendRequest = async () => {
        try {
            const res = await axiosInstance.get('http://localhost:5000/api/auth/user');
            if (res && res.data) {
                return res.data;
            } else {
                console.error('No data found in response');
                return null;
            }
        } catch (err) {
            console.error('Error during HTTP request:', err);
            return null;
        }
    };
    
    useEffect(() => {
        sendRequest().then((data) => {
            if (data) {
                setUser(data);
            }
        });
    }, []);    

    return (
        <div> 
            <h1>Welcome</h1>
            {user ? (
                <>
                    <h1>{user.name}</h1>

                </>
            ) : (
                <p>Loading....</p>
            )}
        </div>
    );
};

export default Welcome;
