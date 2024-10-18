import React, { useState, useEffect } from "react";
import './form.css'; // Link to the external CSS file
import api from '../../services/api';
import { useUser } from '../../services/UserContext';

const PostForm = ({ onSubmitPost, isLoading, error }) => {
    const [postContent, setPostContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser(); // Use the custom hook to get the user data
    const [profilePhoto, setProfilePhoto] = useState(null);
    const maxLength = 300;

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = () => {
        if (postContent.trim()) {
            onSubmitPost(postContent);
            setPostContent(""); 
            closeModal();  // Close modal after submission
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchProfilePhoto = async () => {
          if (user) {
            try {
              const response = await api.get('/user/profile-photo');
              if (response.data && response.data.profilePhoto) {
                setProfilePhoto(response.data.profilePhoto);
              } else {
                setProfilePhoto(null);
              }
            } catch (error) {
              console.error('Error fetching profile photo:', error);
              setProfilePhoto(null);
            }
          }
        };
      
        fetchProfilePhoto();
      }, [user]);

    return (
        <div className="post-form-container">
            {!isModalOpen && (
                <div className="post-form-collapsed" onClick={openModal}>
                    <img 
                        src={profilePhoto ? `http://localhost:5000/${profilePhoto.replace(/\\/g, '/')}` : './assets/profile-placeholder.svg'}
                        alt="profile" 
                        className='rounded-full'
                        onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = './assets/profile-placeholder.svg';
                        }}
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