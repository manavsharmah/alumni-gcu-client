import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import "../pages.css";

const Profile = () => {
    const { id } = useParams();  // Get user ID from the URL, if provided
    const [user, setUser] = useState(null);  // Holds the profile data of the user being viewed
    const [loggedInUser, setLoggedInUser] = useState(null);  // Holds logged-in user data
    const [isOwnProfile, setIsOwnProfile] = useState(false);  // Determines if the logged-in user is viewing their own profile
    const [userPosts, setUserPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const postsPerPage = 5;

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

    const fetchUserPosts = async (userId, page) => {
        setIsLoading(true);
        try {
            const res = await api.get(`/posts/user/${userId}?page=${page}&limit=${postsPerPage}`);
            if (res && res.data) {
                setUserPosts(res.data.posts);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            console.error('Error fetching user posts:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLoggedInUser().then(loggedInUser => {
            if (loggedInUser) {
                if (!id) {
                    setIsOwnProfile(true);
                    setUser(loggedInUser);
                    fetchUserPosts(loggedInUser._id, currentPage);
                } else {
                    fetchUserProfile(id).then((profileData) => {
                        setUser(profileData);
                        setIsOwnProfile(loggedInUser._id === profileData._id);
                        fetchUserPosts(profileData._id, currentPage);
                    });
                }
            }
        });
    }, [id, currentPage]);

    const handlePostClick = () => {
        navigate('/welcome');
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="user-profile-container">
            <h1 className="user-profile-main-title">{isOwnProfile ? "My Profile" : "Profile"}</h1>
            <div className="user-profile-card">
                <div className="user-profile-header">
                    <img 
                        src={user.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="user-profile-picture" 
                    />
                    {isOwnProfile && (
                        <button className="user-profile-change-picture-btn">Change Picture</button>
                    )}
                    <div className="user-profile-info">
                        <h2 className="user-profile-name">{user.name}</h2>
                        <p className="user-profile-email">{user.email}</p>
                    </div>
                </div>
                <div className="user-profile-details">
                    <h3>About</h3>
                    <p><strong>Biography:</strong> {user.biography || "No biography available"}</p>
                    <p><strong>Current Working Place:</strong> {user.currentWorkingPlace || "Not provided"}</p>
                    <p><strong>Batch:</strong> {user.batch || "Not provided"}</p>
                    <p><strong>Branch:</strong> {user.branch || "Not provided"}</p>
                    {isOwnProfile && (
                        <Link to="/update-profile" className="user-profile-update-btn">Update Profile</Link>
                    )}
                </div>
            </div>
            <div className="user-profile-posts-section">
                <h2 className="user-profile-posts-title">Recent Posts</h2>
                {isLoading ? (
                    <p className="user-profile-loading">Loading posts...</p>
                ) : userPosts.length > 0 ? (
                    <div className="user-profile-posts-list">
                        {userPosts.map((post) => (
                            <div key={post._id} className="user-profile-post-link" onClick={handlePostClick}>
                                <div className="user-profile-post-card">
                                    <p className="user-profile-post-content">{post.content}</p>
                                    <small className="user-profile-post-date">{new Date(post.createdAt).toLocaleString()}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="user-profile-no-posts">No recent posts</p>
                )}
                {totalPages > 1 && (
                    <div className="user-profile-pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index + 1} 
                                className={`user-profile-page-number ${currentPage === index + 1 ? 'user-profile-page-number-active' : ''}`} 
                                onClick={() => handleClickPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
