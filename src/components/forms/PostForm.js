import React, { useState } from "react";

const PostForm = ({ onSubmitPost, isLoading, error }) => {
    const [postContent, setPostContent] = useState("");
    const maxLength = 300;

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="post-form" style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div className="profile-picture-small"></div>
                <textarea 
                    className="post-input" 
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={handlePostChange}
                    disabled={isLoading}
                    maxLength={maxLength}
                    style={{ 
                        width: '100%', 
                        height: '100px', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        border: '1px solid #ddd', 
                        resize: 'none',
                        marginBottom: '10px'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Smaller card for character counter */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        fontSize: '0.8em',
                        color: postContent.length > maxLength * 0.9 ? '#e74c3c' : '#666',
                    }}>
                        {postContent.length}/{maxLength}
                    </div>
                    
                    <button 
                        className="post-button" 
                        onClick={handlePostSubmit}
                        disabled={isLoading || postContent.length > maxLength}
                        style={{ 
                            padding: '10px 20px', 
                            borderRadius: '4px', 
                            backgroundColor: '#3498db', 
                            color: 'white', 
                            border: 'none', 
                            cursor: 'pointer'
                        }}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </div>

                {error && <div className="error-message" style={{ color: '#e74c3c', marginTop: '10px' }}>{error}</div>}
            </div>
        </div>
    );
};

export default PostForm;
