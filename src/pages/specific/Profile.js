import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import '../pages.css';

const Profile = () => {
    const { id } = useParams();  // Get the user ID from the URL if provided
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);  // Flag to check if this is the logged-in user
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const postsPerPage = 5;

    // Fetch logged-in user's profile or another user's profile based on the ID
    const fetchUserProfile = async (userId) => {
        try {
            let response;
            if (userId) {
                // Fetch another user's profile
                response = await api.get(`/user/profile/${userId}`);
                setIsLoggedInUser(false);  // Not the logged-in user's profile
            } else {
                // Fetch the logged-in user's profile
                response = await api.get('/user/user');
                setIsLoggedInUser(true);  // This is the logged-in user's profile
            }

            if (response && response.data) {
                return response.data;
            } else {
                console.error('No data found in response');
                return null;
            }
        } catch (err) {
            console.error('Error during HTTP request:', err);
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
        // Fetch the appropriate profile based on URL param (id) or logged-in user
        fetchUserProfile(id).then((data) => {
            if (data) {
                setUser(data);
                fetchUserPosts(data._id, currentPage);
            }
        });
    }, [id, currentPage]);

    const handlePostClick = () => {
        navigate('/welcome');
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangePicture = () => {
        navigate('/change-profile-picture');
    };

    return (
        <div className="user-profile-container">
            <h1 className="user-profile-main-title">Profile</h1>
            <div className="user-profile-card">
                <div className="user-profile-header">
                    <img 
                        src={user?.profilePicture || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        className="user-profile-picture" 
                    />
                    <div className="user-profile-info">
                        <h2 className="user-profile-name">{user?.name}</h2>
                        <p className="user-profile-email">{user?.email}</p>
                        {/* Only show the "Change Picture" button if it's the logged-in user's profile */}
                        {isLoggedInUser && (
                            <button className="user-profile-change-picture-btn" onClick={handleChangePicture}>
                                Change Picture
                            </button>
                        )}
                    </div>
                </div>
                <div className="user-profile-details">
                    <h3>About</h3>
                    <p><strong>Biography:</strong> {user?.biography || "No biography available"}</p>
                    <p><strong>Current Working Place:</strong> {user?.currentWorkingPlace || "Not provided"}</p>
                    <p><strong>Batch:</strong> {user?.batch}</p>
                    <p><strong>Branch:</strong> {user?.branch}</p>
                    {/* Only show the "Update Profile" link if it's the logged-in user's profile */}
                    {isLoggedInUser && (
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
                {/* Pagination */}
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
