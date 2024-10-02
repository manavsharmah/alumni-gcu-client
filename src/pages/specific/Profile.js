import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../pages.css"; 

const Profile = () => {
    const [user, setUser] = useState(null);  // Holds the profile data (same as logged-in user)
    const [loggedInUser, setLoggedInUser] = useState(null);  // Holds logged-in user data

    // Fetch the logged-in user's profile
    const sendRequest = async () => {
        try {
            const res = await api.get('/user/user');  // Same endpoint that returns logged-in user's profile
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
                setUser(data);  // Set profile data
                setLoggedInUser(data);  // Assuming logged-in user is viewing their own profile
            }
        });
    }, []);  // Fetch on initial load

    return (
        <div className="modern-profile-container">
            {/* Profile Header */}
            <div className="modern-profile-header">
                <h1>Profile</h1>
            </div>

            {/* Profile Card */}
            <div className="modern-profile-card">
                <div className="profile-picture-section">
                    <img 
                        src={user && user.profilePicture ? user.profilePicture : "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="profile-picture" 
                    />
                    {/* Only show Change Picture button if logged in user */}
                    {loggedInUser && (
                        <button className="change-pic-button">Change Picture</button>
                    )}
                </div>

                <div className="profile-details-section">
                    <h2>{user && user.name}</h2>
                    <p className="email-text">{user && user.email}</p>

                    <div className="about-section">
                        <h3>About</h3>
                        <p><strong>Biography:</strong> {user && user.biography || "No biography available"}</p>
                        <p><strong>Current Working Place:</strong> {user && user.currentWorkingPlace || "Not provided"}</p>
                        <p><strong>Batch:</strong> {user && user.batch || "Not provided"}</p>
                        <p><strong>Branch:</strong> {user && user.branch || "Not provided"}</p>
                    </div>

                    {/* Show "Update Profile" button only if the logged-in user is viewing their own profile */}
                    {loggedInUser && (
                        <a href="/update-profile">
                            <button className="update-profile-button">Update Profile</button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
