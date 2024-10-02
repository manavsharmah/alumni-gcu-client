import React, { useState, useEffect } from "react";
import api from "../../services/api";

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
    const postsPerPage = 6;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts');
            setPosts(response.data);
        } catch (err) {
            setError("Failed to load posts. Please try again later.");
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
            setPosts([response.data.post, ...posts]);
            setPostContent("");
        } catch (err) {
            setError("Failed to submit post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

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
                            {currentPosts && currentPosts.length > 0 ? (
                                currentPosts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-4">
                                    No posts yet. Be the first to post!
                                </p>
                            )}
                        </div>

                        {/* Pagination */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
