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
            setPostContent(""); 
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '20px 0',
        maxWidth: '800px',
        width: '100%'
    };

    const containerStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%'
    };

    const textAreaStyle = {
        width: '100%',
        height: '100px',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        resize: 'none',
        marginBottom: '10px',
        outline: 'none',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f8f8',
        fontSize: '1.2em'
    };

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '4px',
        backgroundColor: isLoading ? '#ddd' : '#3498db',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    };

    return (
        <div style={formStyle}>
            <div style={containerStyle}>
                <textarea 
                    placeholder="What's on your mind?" 
                    value={postContent} 
                    onChange={handlePostChange} 
                    disabled={isLoading} 
                    maxLength={maxLength}
                    style={textAreaStyle}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                        fontSize: '0.9em',
                        color: postContent.length > maxLength * 0.9 ? '#e74c3c' : '#666',
                    }}>
                        {postContent.length}/{maxLength}
                    </div>
                    <button 
                        onClick={handlePostSubmit} 
                        disabled={isLoading || postContent.length > maxLength} 
                        style={buttonStyle}
                    >
                        {isLoading ? "Posting..." : "Post"}
                    </button>
                </div>
                {error && <div style={{ color: '#e74c3c', marginTop: '10px' }}>{error}</div>}
            </div>
        </div>
    );
};
export default PostForm;
