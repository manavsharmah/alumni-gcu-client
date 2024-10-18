import React, { useState } from "react";
import '../components.css'; // Add your CSS file

const PostCard = ({ post, onDelete, onEdit, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await onDelete(post._id);
        }
    };

    const handleEdit = async () => {
        await onEdit(post._id, editedContent);
        setIsEditing(false);
    };

    const getRelativeTime = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now - postDate;
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} min`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hr${diffInHours > 1 ? 's' : ''}`;
        } else {
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
        }
    };

    const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);
    const canDelete = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);

    return (
        <div className="gcu-post-card">
            <div className="gcu-post-card-wrapper">
                {/* Left Section with Author Info */}
                <div className="gcu-post-card-left">
                    <div className="gcu-post-author-avatar"></div>
                    <div className="gcu-post-author-info">
                        <h3>{post.author?.name || 'Anonymous'}</h3>
                        <p className="gcu-post-author-details">
                            {post.author?.batch && `${post.author.batch} - `} 
                            {post.author?.branch || ''}
                        </p>
                        <p className="gcu-post-timestamp">
                            {getRelativeTime(post.createdAt)}
                        </p>
                        {post.lastEditedAt && (
                            <p className="gcu-post-edit-timestamp">
                                Last Edited: {getRelativeTime(post.lastEditedAt)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Middle Section - Post Content */}
                <div className="gcu-post-card-middle">
                    {isEditing ? (
                        <div className="gcu-edit-form">
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="gcu-edit-textarea"
                                placeholder="Edit your post..."
                            />
                            <div className="gcu-edit-buttons">
                                <button onClick={handleEdit} className="gcu-edit-save-button">💾 Save</button>
                                <button onClick={() => setIsEditing(false)} className="gcu-edit-cancel-button">✖️ Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <p className="gcu-post-content">{post.content}</p>
                    )}
                </div>

                {/* Right Section - Edit/Delete Buttons */}
                <div className="gcu-post-card-right">
                    {canEdit && !isEditing && (
                        <button 
                            className="gcu-edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️
                        </button>
                    )}
                    {canDelete && (
                        <button 
                            className="gcu-delete-button"
                            onClick={handleDelete}
                        >
                            🗑️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
