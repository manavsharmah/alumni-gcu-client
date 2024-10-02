import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // Import useParams from React Router
import api from "../../services/api";
import "../pages.css"; 

const Profile = () => {
    const { id } = useParams();  // Get user ID from the URL, if provided
    const [user, setUser] = useState(null);  // Holds the profile data of the user being viewed
    const [loggedInUser, setLoggedInUser] = useState(null);  // Holds logged-in user data
    const [isOwnProfile, setIsOwnProfile] = useState(false);  // Determines if the logged-in user is viewing their own profile

    // Fetch the profile (either the logged-in user's or another user's)
    const fetchUserProfile = async (userId) => {
        try {
            const endpoint = userId ? `/user/profile/${userId}` : '/user/user';
            const res = await api.get(endpoint);  // Fetch either another user's profile or the logged-in user's profile
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

    // Fetch logged-in user's profile separately to determine ownership
    const fetchLoggedInUser = async () => {
        try {
            const res = await api.get('/user/user');  // Fetch logged-in user's profile
            if (res && res.data) {
                setLoggedInUser(res.data);
                return res.data;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error fetching logged-in user:', err);
            return null;
        }
    };

    useEffect(() => {
        // Fetch the logged-in user's profile to compare if they are viewing their own profile
        fetchLoggedInUser().then(loggedInUser => {
            if (loggedInUser) {
                if (!id) {
                    // If no ID is in the URL, the logged-in user is viewing their own profile
                    setIsOwnProfile(true);
                    setUser(loggedInUser);
                } else {
                    // If an ID is provided in the URL, fetch that user's profile
                    fetchUserProfile(id).then((profileData) => {
                        setUser(profileData);
                        setIsOwnProfile(loggedInUser._id === profileData._id);  // Check if logged-in user is viewing their own profile
                    });
                }
            }
        });
    }, [id]);  // Re-run when `id` changes

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="modern-profile-container">
            {/* Profile Header */}
            <div className="modern-profile-header">
                <h1>{isOwnProfile ? "My Profile" : "Profile"}</h1>
            </div>

            {/* Profile Card */}
            <div className="modern-profile-card">
                <div className="profile-picture-section">
                    <img 
                        src={user.profilePicture ? user.profilePicture : "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="profile-picture" 
                    />
                    {/* Only show Change Picture button if the logged-in user is viewing their own profile */}
                    {isOwnProfile && (
                        <button className="change-pic-button">Change Picture</button>
                    )}
                </div>

                <div className="profile-details-section">
                    <h2>{user.name}</h2>
                    <p className="email-text">{user.email}</p>

                    <div className="about-section">
                        <h3>About</h3>
                        <p><strong>Biography:</strong> {user.biography || "No biography available"}</p>
                        <p><strong>Current Working Place:</strong> {user.currentWorkingPlace || "Not provided"}</p>
                        <p><strong>Batch:</strong> {user.batch || "Not provided"}</p>
                        <p><strong>Branch:</strong> {user.branch || "Not provided"}</p>
                    </div>

                    {/* Show "Update Profile" button only if the logged-in user is viewing their own profile */}
                    {isOwnProfile && (
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
