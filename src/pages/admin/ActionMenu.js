import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const ActionMenu = ({ onEdit, onDelete, onDeleteImages, onAddImages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const checkPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setShowAbove(spaceBelow < 400); // 200px threshold for menu height
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Initial check

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', checkPosition);
    };
  }, []);

  return (
    <div className="action-menu-container" ref={menuRef}>
      <button 
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="action-menu-button"
      >
        <MoreVertical size={20} color="#0066ff" />
      </button>
      
      {isOpen && (
        <div className={`action-menu-dropdown ${showAbove ? 'dropdown-above' : ''}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setIsOpen(false);
            }}
            className="menu-item edit-button"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setIsOpen(false);
            }}
            className="menu-item delete-button"
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteImages();
              setIsOpen(false);
            }}
            className="menu-item delete-images-button"
          >
            Delete Images
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddImages();
              setIsOpen(false);
            }}
            className="menu-item add-images-button"
          >
            Add Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;