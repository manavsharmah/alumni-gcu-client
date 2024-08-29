import React, { useEffect, useState } from "react";
import api from "../../services/api";
import '../pages.css'; 

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
        <div className="prof-container">
            <div className="prof-header">
                <h1>Profile</h1>
                {/* Add dummy profile picture */}
                <div className="profile-picture-container">
                    <img src="https://via.placeholder.com/100" alt="Profile" className="profile-picture" />
                    {/* Add button to change profile picture */}
                    <button className="change-pic-button">Change Profile Picture</button>
                </div>
                <p>{user && user.name}</p>
                <p>{user && user.email}</p>
            </div>
            <div className="profile-info card">
                <h2>About</h2>
                <p><strong>Biography:</strong> {user && user.biography}</p>
                <p><strong>Current Working Place:</strong> {user && user.currentWorkingPlace}</p>
                <p><strong>Batch:</strong> {user && user.batch}</p>
                <p><strong>Branch:</strong> {user && user.branch}</p>
                <a href="/update-profile"><button className="button">Update Profile</button></a>
            </div>
        </div>
    );
};

export default Profile;
