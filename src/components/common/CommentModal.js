import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentModal = ({ isOpen, onClose, onSubmitComment, comments, onDeleteComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');

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
      return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log('Submitting comment:', commentText);
      onSubmitComment(commentText);
      setCommentText('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="gcu-modal-overlay">
      <div className="gcu-modal-content">
        <div className="gcu-modal-header">
          <h2 className="gcu-modal-title">Comments</h2>
          <button 
            className="gcu-modal-close"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="gcu-comments-list">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="gcu-comment">
                <div className="gcu-comment-header">
                  <span className="gcu-comment-author">{comment.author.name}</span>
                  <span className="gcu-comment-time">
                    {getRelativeTime(comment.createdAt)}
                  </span>
                  {(currentUser.id === comment.author._id || currentUser.role === 'admin') && (
                    <button 
                      className="gcu-comment-delete"
                      onClick={() => onDeleteComment(comment._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                </div>
                <p className="gcu-comment-text">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="gcu-no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="gcu-comment-form">
          <textarea
            className="gcu-comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
          />
          <button 
            type="submit" 
            className="gcu-comment-submit"
            disabled={!commentText.trim()}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
