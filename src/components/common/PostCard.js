import React from "react";

const PostCard = ({ post, onDelete, currentUser }) => {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await onDelete(post._id);
        }
    };

    const canDelete = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);

    return (
        <div className="gcu-post-card">
            <div className="gcu-post-card-header">
                <div className="gcu-post-author-avatar"></div>
                <div className="gcu-post-author-info">
                    <h3 className="gcu-post-author-name">{post.author?.name || 'Anonymous'}</h3>
                    <p className="gcu-post-author-details">
                        {post.author?.batch && `${post.author.batch} - `}
                        {post.author?.branch || ''}
                    </p>
                    <p className="gcu-post-timestamp">
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
                {canDelete && (
                    <button 
                        className="gcu-post-delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
            <div className="gcu-post-content">
                {post.content}
            </div>
        </div>
    );
};

export default PostCard;
