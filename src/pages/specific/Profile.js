import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";
import PostCard from '../../components/common/PostCard';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChangePicture = () => {
        navigate('/change-profile-picture');
    };

    // New post management functions
    const handleDeletePost = async (postId) => {
        try {
            await api.delete(`/posts/${postId}`);
            // Refresh posts after deletion
            if (user) {
                fetchUserPosts(user._id, currentPage);
            }
            handleCloseModal(); // Close the modal after deletion
        } catch (err) {
            console.error('Error deleting post:', err);
        }
    };

    const handleEditPost = async (postId, newContent) => {
        try {
            await api.put(`/posts/${postId}`, { content: newContent });
            // Refresh posts after edit
            if (user) {
                fetchUserPosts(user._id, currentPage);
            }
            // Update the selected post if it's currently being viewed
            if (selectedPost && selectedPost._id === postId) {
                setSelectedPost(prev => ({
                    ...prev,
                    content: newContent,
                    lastEditedAt: new Date().toISOString()
                }));
            }
        } catch (err) {
            console.error('Error editing post:', err);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await api.put(`/posts/${postId}/like`);
            const updatedPost = response.data;

            // Update posts list
            setUserPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === postId ? { ...post, likes: updatedPost.likes } : post
                )
            );

            // Update selected post if it's currently being viewed
            if (selectedPost && selectedPost._id === postId) {
                setSelectedPost(prev => ({
                    ...prev,
                    likes: updatedPost.likes
                }));
            }
        } catch (err) {
            console.error('Error toggling like:', err);
        }
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
            {isModalOpen && selectedPost && (
                <>
                    <div 
                        className="modal-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999,
                        }}
                        onClick={handleCloseModal}
                    />
                    <div
                        className="modal-content"
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                            width: '80%',
                            maxWidth: '600px',
                        }}
                    >
                        <button
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                padding: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s',
                                color: 'white',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            ×
                        </button>
                        <PostCard 
                            post={selectedPost} 
                            currentUser={currentUser}
                            onDelete={handleDeletePost}
                            onEdit={handleEditPost}
                            onLike={handleLike}
                            modalOverlayStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.6)'
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;