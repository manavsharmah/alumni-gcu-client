import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../services/UserContext';
import api from '../../services/api'
import 'bootstrap/dist/css/bootstrap.min.css';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const ModalGalleryManager = ({ show, onHide }) => {
  const [view, setView] = useState('gallery'); // 'gallery' or 'album'
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (show) {
      fetchAlbums();
    }
  }, [show]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/images/albums`);
      if (!response.ok) throw new Error('Failed to fetch albums');
      const data = await response.json();
      if (Array.isArray(data)) {
        const sortedAlbums = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAlbums(sortedAlbums);
      }
    } catch (err) {
      console.error('Error fetching albums:', err);
    }
  };

  const fetchAlbum = async (albumId) => {
    try {
      const response = await api.get(`/images/album/${albumId}`);
      setCurrentAlbum(response.data);
      setView('album');
    } catch (err) {
      console.error('Error fetching album:', err);
    }
  };

  const handleDeleteAlbum = async (albumId, event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/images/album/${albumId}`);
      
      setAlbums(albums.filter(album => album._id !== albumId));
      setDeleteMessage('Album deleted successfully!');
      
      setTimeout(() => {
        setDeleteMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting album:', error);
      setDeleteMessage('Error deleting album. Please try again.');
      setTimeout(() => {
        setDeleteMessage('');
      }, 3000);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedImages.length} selected images?`
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        '/images/delete-selected',
        {
          data: {
            albumId: currentAlbum._id,
            selectedImages: selectedImages
          }
        }
      );

      if (response.data.albumDeleted) {
        setDeleteMessage('Album deleted successfully!');
        setTimeout(() => {
          setView('gallery');
          fetchAlbums();
        }, 2000);
      } else {
        setCurrentAlbum({
          ...currentAlbum,
          images: currentAlbum.images.filter(image => !selectedImages.includes(image))
        });
        setSelectedImages([]);
        setIsSelectionMode(false);
        
        setDeleteMessage(`Successfully deleted ${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''}!`);
        setTimeout(() => {
          setDeleteMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting images:', error);
      setDeleteMessage('Error deleting images. Please try again.');
      setTimeout(() => {
        setDeleteMessage('');
      }, 3000);
    }
  };

  const handleImageClick = (image) => {
    if (isSelectionMode) {
      const isSelected = selectedImages.includes(image);
      if (isSelected) {
        setSelectedImages(selectedImages.filter(img => img !== image));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    }
  };

  const renderGalleryView = () => (
    <div className="p-3">
      {deleteMessage && (
        <div className={`alert ${deleteMessage.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
          {deleteMessage}
        </div>
      )}
  
      <div className="row g-4">
        {albums.map((album) => (
          <div key={album._id} className="col-12 col-sm-6 col-md-4">
            <div 
              className="card h-100 position-relative shadow-sm" 
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)', position: 'relative' }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.overlay').style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.overlay').style.opacity = 0;
              }}
            >
              <div 
                className="cursor-pointer h-100 d-flex flex-column"
                onClick={() => fetchAlbum(album._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="position-relative" style={{ height: '200px' }}>
                  <img
                    src={`${BASE_URL}${album.lastImage}`}
                    alt={album.albumName}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      borderTopLeftRadius: 'calc(0.375rem - 1px)',
                      borderTopRightRadius: 'calc(0.375rem - 1px)'
                    }}
                  />
                  <div 
                    className="overlay" 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      fontSize: '1.2rem',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      borderTopLeftRadius: 'calc(0.375rem - 1px)',
                      borderTopRightRadius: 'calc(0.375rem - 1px)',
                    }}
                  >
                    <span style={{ textAlign: 'center' }}>Go to Album</span>
                  </div>
                </div>
                <div className="card-body bg-white flex-grow-1 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{album.albumName}</h5>
                  <button 
                    onClick={(e) => handleDeleteAlbum(album._id, e)}
                    className="btn btn-danger btn-sm"
                    style={{ zIndex: 1 }}
                  >
                    Delete Album
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const renderAlbumView = () => (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="link"
          onClick={() => {
            setView('gallery');
            setSelectedImages([]);
            setIsSelectionMode(false);
          }}
          className="text-decoration-none"
        >
          ← Back to Gallery
        </Button>
        <div>
          <Button 
            variant="primary"
            className="me-2"
            onClick={() => setIsSelectionMode(!isSelectionMode)}
          >
            {isSelectionMode ? "Cancel Selection" : "Select Images"}
          </Button>
          {isSelectionMode && (
            <Button 
              variant="danger"
              onClick={handleDeleteSelected}
              disabled={selectedImages.length === 0}
            >
              Delete Selected ({selectedImages.length})
            </Button>
          )}
        </div>
      </div>
      
      {deleteMessage && (
        <div className={`alert ${deleteMessage.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
          {deleteMessage}
        </div>
      )}
      
      <div className="row g-4">
        {currentAlbum?.images.map((image, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div
              className={`card h-100 position-relative shadow-sm ${
                isSelectionMode ? 'cursor-pointer' : ''
              } ${selectedImages.includes(image) ? 'border-primary' : ''}`}
              onClick={() => handleImageClick(image)}
              style={{ 
                cursor: isSelectionMode ? 'pointer' : 'default',
                backgroundColor: '#fff',
                border: '1px solid rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <div className="position-relative" style={{ height: '200px' }}>
                <img
                  src={`${BASE_URL}${image}`}
                  alt={`${currentAlbum.albumName}_image_${index}`}
                  className="w-100 h-100"
                  style={{ 
                    objectFit: 'cover',
                    borderTopLeftRadius: 'calc(0.375rem - 1px)',
                    borderTopRightRadius: 'calc(0.375rem - 1px)'
                  }}
                />
              </div>
              {isSelectionMode && selectedImages.includes(image) && (
                <div 
                  className="position-absolute top-0 end-0 m-2 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ width: '24px', height: '24px', zIndex: 1 }}
                >
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      centered
      className="modal-gallery"
    >
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>{view === 'gallery' ? 'Albums' : 'Viewing Album - '+currentAlbum?.albumName}</Modal.Title>
      </Modal.Header>
      <Modal.Body 
        style={{ 
          maxHeight: '80vh', 
          overflowY: 'auto',
          backgroundColor: '#f8f9fa'
        }}
      >
        {view === 'gallery' ? renderGalleryView() : renderAlbumView()}
      </Modal.Body>
    </Modal>
  );
};

export default ModalGalleryManager;