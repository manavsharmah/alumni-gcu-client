import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MAX_CHAR_LIMIT = 150;

const CommentModal = ({ isOpen, onClose, onSubmitComment }) => {
  const [commentText, setCommentText] = useState('');
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR_LIMIT);

  useEffect(() => {
    setRemainingChars(MAX_CHAR_LIMIT - commentText.length);
  }, [commentText]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim() && commentText.length <= MAX_CHAR_LIMIT) {
      try {
        await onSubmitComment(commentText);
        setCommentText('');
        onClose(); // Simply close the modal after successful submission
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <style>
      {`
        .gcu-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:rgba(115, 118, 135, 0.05);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .gcu-modal-content {
          background: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
        }

        .gcu-modal-close {
          color: #dc3545
        }

        .gcu-modal-close:hover {
          background:rgba(251, 9, 33, 0.22);
          border-radius: 50px;
        }


        .gcu-comment-submit:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}
    </style>
    <div className="gcu-modal-overlay">
      <div className="gcu-modal-content">
        <div className="gcu-modal-header">
          <h2 className="gcu-modal-title">Add a Comment...</h2>
          <button 
            className="gcu-modal-close"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

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
    </>
  );
};

export default CommentModal;