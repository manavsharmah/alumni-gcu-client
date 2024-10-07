import React, { useState } from "react";

const PostForm = ({ onSubmitPost, isLoading, error }) => {
    const [postContent, setPostContent] = useState("");

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            onSubmitPost(postContent);
            setPostContent("");  // Clear the input after submitting
        }
    };

    return (
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
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default PostForm;
