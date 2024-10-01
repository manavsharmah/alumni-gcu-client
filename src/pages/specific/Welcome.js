import React, { useState } from "react";
import axios from "axios";
import api from "../../services/api"
import VerifiedUsersList from "../../components/common/VerifiedUsersList";

axios.defaults.withCredentials = true;

const Welcome = () => {   
    const [postContent, setPostContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
            console.log("Post submitted successfully:", response.data);
            setPostContent("");
            // You might want to update the UI here, e.g., show the new post or a success message
        } catch (err) {
            console.error("Error submitting post:", err);
            setError("Failed to submit post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="post-section">
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
                </div>
                {/* <div className="users-container">
                    <VerifiedUsersList />
                </div> */}
            </div>
        </div>
    );
};

export default Welcome;
