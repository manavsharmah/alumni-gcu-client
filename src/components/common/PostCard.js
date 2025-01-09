import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../components.css';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";
import CommentModal from "./CommentModal";
import api from "../../services/api"; // Add this import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEllipsisH,
    faThumbsUp, 
    faComment,
    faShare
} from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post, onDelete, onEdit, onLike, currentUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.content);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [showMenu, setShowMenu] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            await onDelete(post._id);
        }
        setShowMenu(false);
    };

    const handleEdit = async () => {
        await onEdit(post._id, editedContent);
        setIsEditing(false);
    };

    const handleLike = async () => {
        try {
            await onLike(post._id);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentSubmit = async (commentText) => {
        try {
            const response = await api.post(`/posts/${post._id}/comments`, {
                text: commentText
            });
            setComments([...comments, response.data]);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/posts/${post._id}/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
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

    const canEdit = currentUser && (currentUser.id === post.author._id);
    const canDelete = currentUser && (currentUser.role === 'admin' || currentUser.id === post.author._id);
    const hasLiked = Array.isArray(post.likes) && post.likes.includes(currentUser.id);

    return (
        <div className="gcu-post-card">
            <div className="gcu-post-card-wrapper">
                {/* Three-dot menu */}
                {(canEdit || canDelete) && (
                    <div className="gcu-top-actions">
                        <div className="relative">
                            <button 
                                className="gcu-menu-button"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </button>
                            {showMenu && (
                                <div className="gcu-dropdown-menu">
                                    {canEdit && !isEditing && (
                                        <button 
                                            className="gcu-menu-item"
                                            onClick={() => {
                                                setIsEditing(true);
                                                setShowMenu(false);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {canDelete && (
                                        <button 
                                            className="gcu-menu-item"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Left Section with Author Info */}
                <div className="gcu-post-card-left">
                    <Link to={`/profile/${post.author?._id}`}>
                        <ProfilePhoto 
                            userId={post.author?._id}
                            className="gcu-post-author-avatar"
                        />
                    </Link>
                    <div className="gcu-post-author-info">
                        <Link to={`/profile/${post.author?._id}`} className="gcu-post-author-name">
                            <h3>{post.author?.name || 'Anonymous'}</h3>
                        </Link>
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
                                <button onClick={handleEdit} className="gcu-edit-save-button">
                                    Save
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedContent(post.content);
                                    }} 
                                    className="gcu-edit-cancel-button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="gcu-post-content">{post.content}</p>
                    )}
                </div>
                
                <hr className="gcu-horizontal-line" />

                {/* Bottom action buttons */}
                <div className="gcu-post-actions">
                    <button
                        className={`gcu-action-button ${hasLiked ? 'liked' : ''}`}
                        onClick={handleLike}
                        title={hasLiked ? "Unlike post" : "Like post"}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} /> {post.likes.length}
                    </button>
                    <button
                        className="gcu-action-button"
                        onClick={() => setIsCommentModalOpen(true)}
                        title="Comment on post"
                    >
                        <FontAwesomeIcon icon={faComment} /> {comments.length}
                    </button>
                    <button
                        className="gcu-action-button"
                        onClick={() => {}}
                        title="Share post"
                    >
                        <FontAwesomeIcon icon={faShare} />
                    </button>
                </div>

                <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={() => setIsCommentModalOpen(false)}
                    onSubmitComment={handleCommentSubmit}
                    onDeleteComment={handleDeleteComment}
                    comments={comments}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
};

export default PostCard;
