import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const postsPerPage = 5;

    useEffect(() => {
        // Get current user from token
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
        }
    }, []);

    const fetchUserProfile = async (userId) => {
        try {
            let response;
            if (userId) {
                response = await api.get(`/user/profile/${userId}`);
                setIsLoggedInUser(false);
            } else {
                response = await api.get('/user/user');
                setIsLoggedInUser(true);
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
        fetchUserProfile(id).then((data) => {
            if (data) {
                setUser(data);
                fetchUserPosts(data._id, currentPage);
            }
        });
    }, [id, currentPage]);

    const handlePostClick = (post) => {
        // Navigate to FeedPostView for the selected post
        navigate(`/welcome/post/${post._id}`);
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangePicture = () => {
        navigate('/change-profile-picture');
    };

    return (
        <div className="main">
            <div className="user-profile-container">
                <h1 className="user-profile-main-title">Profile</h1>
                <div className="user-profile-card">
                    <div className="user-profile-header">
                        <ProfilePhoto
                            userId={user?._id}
                            className="user-profile-picture"
                        />
                        <div className="user-profile-info">
                            <h2 className="user-profile-name">{user?.name}</h2>
                            <p className="user-profile-email">{user?.email}</p>
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
                                <div key={post._id} className="user-profile-post-link" onClick={() => handlePostClick(post)}>
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
        </div>
    );
};

export default Profile;