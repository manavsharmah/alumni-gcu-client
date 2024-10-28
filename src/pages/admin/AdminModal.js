import React from 'react';
import './admin.css';  // Reuse your existing modal styles

const Modal = ({ title, content, isOpen, closeModal }) => {
  if (!isOpen) return null;  // If modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="admin-modal-content">
        <h2>{title}</h2> {/* Dynamic Title */}
        <div className="modal-body">
          {content} {/* Dynamic Content */}
        </div>
        <button onClick={closeModal} className="close-modal-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
