import React, { useState } from 'react';
import './admin.css';
//this modal is shared between newsform and eventsform
const SharedImagesAddModal = ({ 
  isOpen, 
  onClose, 
  itemId, 
  itemTitle, 
  api, 
  onImagesAdded,
  category //prop to determine if its news or events
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', itemTitle);
    
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const endpoint = category === 'news' 
        ? `/news/upload-news-images/${itemId}`
        : `/events/upload-events-images/${itemId}`;

      await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(`Successfully added ${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''}`);
      setSelectedImages([]);

      setTimeout(() => {
        onImagesAdded();
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload images');
      console.error('Upload error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <h2 className="modal-title">Add Images</h2>

        {error && <div className="modal-message error">{error}</div>}
        {successMessage && (
          <div className="modal-message success">{successMessage}</div>
        )}

        <div className="form-group">
          <label htmlFor="add-images">Select Images:</label>
          <input
            type="file"
            id="add-images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className="modal-actions">
          <button 
            onClick={onClose} 
            className="admin-button cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="admin-button upload"
            disabled={selectedImages.length === 0}
          >
            Upload Selected ({selectedImages.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedImagesAddModal;