import React, { useState, useEffect } from "react";
import './form.css'; // Link to the external CSS file
import { useUser } from '../../services/UserContext';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";

const PostForm = ({ onSubmitPost, isLoading, error }) => {
    const [postContent, setPostContent] = useState("");
    const [category, setCategory] = useState("post"); // Default category
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser(); // Use the custom hook to get the user data
    const maxLength = 300;

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            onSubmitPost(postContent, category); // Send category along with the content
            setPostContent(""); 
            setCategory("post");  // Reset category to default after submission
            closeModal();  // Close modal after submission
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="post-form-container">
            {!isModalOpen && (
                <div className="post-form-collapsed" onClick={openModal}>
                    <ProfilePhoto 
                        userId={user._id}
                        className="rounded-full"
                    />
                    <input
                        type="text"
                        className="collapsed-input"
                        placeholder="Start a post, try writing with AI"
                        readOnly
                    />
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="form-modal-content">
                        <div className="modal-header">
                            <span>Create a Post</span>
                            <button className="close-btn" onClick={closeModal}>✖</button>
                        </div>
                        <textarea 
                            placeholder="What do you want to talk about?" 
                            value={postContent} 
                            onChange={handlePostChange} 
                            disabled={isLoading} 
                            maxLength={maxLength}
                            className="modal-textarea"
                        />
                        {/* Dropdown for selecting the category */}
                        <div className="category-selector">
                            <label htmlFor="category">Choose a category:</label>
                            <select 
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="post">Regular Post</option>
                                <option value="job">Job Opportunity</option>
                                <option value="education">Education Opportunity</option>
                            </select>
                        </div>
                        <div className="post-footer">
                            <span className={`char-count ${postContent.length > maxLength * 0.9 ? 'warning' : ''}`}>
                                {postContent.length}/{maxLength}
                            </span>
                            <button 
                                onClick={handlePostSubmit} 
                                disabled={isLoading || postContent.length > maxLength} 
                                className={`post-btn ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? "Posting..." : "Post"}
                            </button>
                        </div>
                        {error && <div className="error-msg">{error}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostForm;
