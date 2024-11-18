import React, { useState, useEffect } from 'react';
import './admin.css';
//this modal is shared between newsform and eventsform
const SharedImagesDeleteModal = ({ isOpen, onClose, itemId, api, onImagesDeleted, category }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen, itemId]);

  const fetchImages = async () => {
    try {
      const endpoint = category === 'news'
        ? `/news/get-news-images/${itemId}`
        : `/events/get-events-images/${itemId}`;

      const response = await api.get(endpoint);
      setImages(response.data.images);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch images');
      setLoading(false);
    }
  };

  const toggleImageSelection = (filename) => {
    setSelectedImages(prev => 
      prev.includes(filename)
        ? prev.filter(name => name !== filename)
        : [...prev, filename]
    );
  };

  const handleDelete = async () => {
    try {
      const endpoint = category === 'news'
        ? `/news/delete-news-images/${itemId}`
        : `/events/delete-events-images/${itemId}`;

      await api.delete(endpoint, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        data: { imagesToDelete: selectedImages }
      });
      setSuccessMessage(`Successfully deleted ${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''}`);
      setSelectedImages([]);
      fetchImages();
      
      setTimeout(() => {
        onImagesDeleted();
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete images');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <h2 className="modal-title">Delete Images</h2>
        
        {loading && <p>Loading images...</p>}
        {error && <div className="modal-message error">{error}</div>}
        {successMessage && (
          <div className="modal-message success">{successMessage}</div>
        )}
        
        <div className="images-grid">
          {images.map((image) => (
            <div 
              key={image.filename}
              className={`image-container ${selectedImages.includes(image.filename) ? 'selected' : ''}`}
              onClick={() => toggleImageSelection(image.filename)}
            >
              <img 
                src={`http://localhost:5000${image.fullPath}`}
                alt={image.filename}
              />
              <div className="image-filename">
                {image.filename}
              </div>
            </div>
          ))}
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={onClose}
            className="admin-button cancel"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="admin-button delete"
            disabled={selectedImages.length === 0}
          >
            Delete Selected ({selectedImages.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedImagesDeleteModal;