import React, { useState } from "react";

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const canEdit = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);
    const canDelete = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);

    return (
        <div className="gcu-post-card">
            <div className="gcu-post-card-wrapper">
                <div className="gcu-post-card-left">
                    <div className="gcu-post-author-avatar"></div>
                    <div className="gcu-post-author-info">
                        <h3 className="gcu-post-author-name">{post.author?.name || 'Anonymous'}</h3>
                        <p className="gcu-post-author-details">
                            {post.author?.batch && `${post.author.batch} - `}
                            {post.author?.branch || ''}
                        </p>
                        <p className="gcu-post-timestamp">
                            Posted: {formatDate(post.createdAt)} at {formatTime(post.createdAt)}
                        </p>
                        {post.lastEditedAt && (
                            <p className="gcu-post-edit-timestamp">
                                Last Edited: {formatDate(post.lastEditedAt)} at {formatTime(post.lastEditedAt)}
                                {post.lastEditedBy && ` by ${post.lastEditedBy}`}
                            </p>
                        )}
                    </div>
                </div>
                
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

                <div className="gcu-post-card-right">
                    {canEdit && !isEditing && (
                        <button 
                            className="gcu-edit-button"
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️ Edit
                        </button>
                    )}
                    {canDelete && (
                        <button 
                            className="gcu-delete-button"
                            onClick={handleDelete}
                        >
                            🗑️ Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
