import React, { useState, useEffect } from "react";
import './form.css';
import { useUser } from '../../services/UserContext';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";
import { toast } from 'react-toastify';

const PostForm = ({ onSubmitPost, isLoading, error }) => {
    const [postContent, setPostContent] = useState("");
    const [category, setCategory] = useState("post");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const { user } = useUser();
    const maxLength = 300;
    const cooldownDuration = 45;
    const cooldownKey = `cooldown_${user._id}`;

    useEffect(() => {
        const savedEndTime = localStorage.getItem(cooldownKey);
        if (savedEndTime) {
            const remainingTime = Math.floor((new Date(savedEndTime) - new Date()) / 1000);
            if (remainingTime > 0) {
                setCooldownTime(remainingTime);
            } else {
                localStorage.removeItem(cooldownKey); // Cleanup expired timer
            }
        }
    }, [cooldownKey]);

    useEffect(() => {
        if (cooldownTime > 0) {
            const timer = setTimeout(() => {
                setCooldownTime(cooldownTime - 1);
                if (cooldownTime - 1 <= 0) {
                    localStorage.removeItem(cooldownKey); // Clear timer once cooldown ends
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldownTime, cooldownKey]);

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePostSubmit = () => {
        if (cooldownTime > 0) {
            toast.error(`Too many requests! Please wait for ${cooldownTime} seconds.`);
            return;
        }

        if (postContent.trim()) {
            onSubmitPost(postContent, category);
            setPostContent("");
            setCategory("post");
            closeModal();

            // Set cooldown timer and save end time to localStorage
            const endTime = new Date(new Date().getTime() + cooldownDuration * 1000);
            localStorage.setItem(cooldownKey, endTime.toISOString());
            setCooldownTime(cooldownDuration);
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
                        placeholder="Create a post"
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
                            {cooldownTime > 0 && (
                                <span className="cooldown-timer">
                                    Please wait {cooldownTime} seconds before posting again.
                                </span>
                            )}
                            <button 
                                onClick={handlePostSubmit} 
                                disabled={isLoading || cooldownTime > 0 || postContent.length > maxLength} 
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
