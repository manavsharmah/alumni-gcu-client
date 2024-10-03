import React, { useState, useEffect } from "react";
import api from "../../services/api";
import axios from "axios";

axios.defaults.withCredentials = true;

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <div className="post-author-avatar"></div>
        <div className="post-author-info">
          <h3 className="post-author-name">{post.author?.name || 'Anonymous'}</h3>
          <p className="text-sm text-gray-500">
            {post.author?.batch && `${post.author.batch} - `}
            {post.author?.branch || ''}
          </p>
          <p className="post-timestamp">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="post-content">
        {post.content}
      </div>
    </div>
  );
};

const Welcome = () => {   
    const [postContent, setPostContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        try {
            setIsLoading(true);
            const response = await api.get(`/posts?page=${page}&limit=${postsPerPage}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Failed to load posts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = async () => {
        if (!postContent.trim()) {
            setError("Post content cannot be empty");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/posts/create', { content: postContent });
            // Refresh the current page after posting
            fetchPosts(currentPage);
            setPostContent("");
        } catch (err) {
            setError("Failed to submit post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="post-section">
                    <div className="w-full max-w-2xl">
                        <div className="post-form">
                            <div className="profile-picture-small"></div>
                            <input 
                                type="text" 
                                className="post-input" 
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={handlePostChange}
                                disabled={isLoading}
                            />
                            <button 
                                className="post-button" 
                                onClick={handlePostSubmit}
                                disabled={isLoading}
                            >
                                {isLoading ? "Posting..." : "Post"}
                            </button>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="posts-container">
                            {isLoading ? (
                                <p className="text-center">Loading posts...</p>
                            ) : posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-4">
                                    No posts yet. Be the first to post!
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="posts-pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button 
                                        key={index + 1} 
                                        className={`posts-page-number ${currentPage === index + 1 ? 'posts-page-number-active' : ''}`} 
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
        </div>
    );
};

export default Welcome;
