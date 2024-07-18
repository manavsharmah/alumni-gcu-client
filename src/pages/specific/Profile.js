import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Profile = () => {
    const [user, setUser] = useState(null); // Initialize user to null
    
    const sendRequest = async () => {
        try {
            const res = await api.get('/user/user');
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
            <h1>Profile</h1>
            <p>{user && user.name}</p>
            <p>{user && user.email}</p>
            <p>{user && user.biography}</p>
            <p>{user && user.currentWorkingPlace}</p>
            <p>{user && user.batch}</p>
            <a href="/update-profile"><button className="button">Update Profile</button></a>

        </div>
    );
};


export default Profile;

