import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from './Pagination';

const COMMENTS_PER_PAGE = 5;
const MAX_CHAR_LIMIT = 150;

const CommentModal = ({ isOpen, onClose, onSubmitComment, comments, onDeleteComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComments, setPaginatedComments] = useState([]);
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR_LIMIT);

  const totalPages = Math.ceil((comments?.length || 0) / COMMENTS_PER_PAGE);

  useEffect(() => {
    if (comments) {
      // Reverse comments to show newest first
      const reversedComments = [...comments].reverse();
      const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
      const endIndex = startIndex + COMMENTS_PER_PAGE;
      setPaginatedComments(reversedComments.slice(startIndex, endIndex));
    }
  }, [comments, currentPage]);

  useEffect(() => {
    setRemainingChars(MAX_CHAR_LIMIT - commentText.length);
  }, [commentText]);

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
    if (commentText.trim() && commentText.length <= MAX_CHAR_LIMIT) {
      onSubmitComment(commentText);
      setCommentText('');
      setCurrentPage(1); // Reset to the first page after a new comment is added
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!isOpen) return null;

  return (
    <div className="gcu-modal-overlay">
      <div className="gcu-modal-content">
        <div className="gcu-modal-header">
          <h2 className="gcu-modal-title">Comments ({comments?.length || 0})</h2>
          <button 
            className="gcu-modal-close"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="gcu-comments-list">
          {paginatedComments && paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <div key={comment._id} className="gcu-comment">
                <div className="gcu-comment-header">
                  <div className="gcu-comment-author-info">
                    <span className="gcu-comment-author">
                      {comment.author?.name}
                    </span>
                    {comment.author?.branch && (
                      <span className="gcu-comment-branch">{comment.author.branch}</span>
                    )}
                  </div>
                  <span className="gcu-comment-time">
                    {getRelativeTime(comment.createdAt)}
                  </span>
                  {(currentUser.id === comment.author?._id || currentUser.role === 'admin') && (
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

        {totalPages > 1 && (
          <div className="gcu-comments-pagination">
            <Pagination 
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="gcu-comment-form">
          <textarea
            className="gcu-comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
            maxLength={MAX_CHAR_LIMIT}
          />
          <div className="gcu-comment-counter">
            {remainingChars} characters remaining
          </div>
          <button 
            type="submit" 
            className="gcu-comment-submit"
            disabled={!commentText.trim() || commentText.length > MAX_CHAR_LIMIT}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
