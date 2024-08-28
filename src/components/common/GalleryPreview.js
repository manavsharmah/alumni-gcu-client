import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components.css';

const GalleryPreview = () => {
    const [photos, setPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPhotos = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/images/get-photos');
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setPhotos(data);
          } else {
            console.error('Unexpected data format received');
          }
        } catch (err) {
          console.error('Error fetching photos:', err);
        }
      };
  
      fetchPhotos();
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 7) % photos.length);
      }, 10000); // Change images every 10 seconds
      return () => clearInterval(interval);
    }, [photos.length]);

    const handleImageClick = () => {
        navigate('/gallery'); // Navigate to the gallery page
      };
  
    return (
      <div className="gallery-preview-container">
        <h2 className="gallery-heading">Gallery Preview</h2>
        {photos.length > 0 ? (
          <div className="gallery-preview">
            {photos.slice(currentIndex, currentIndex + 7).map((photo, index) => (
            <img
              key={index}
              src={photo.url}
              alt={`photo_${index}`}
              className="preview-image"
              onClick={handleImageClick} // Add click handler
            />
          ))}
          </div>
        ) : (
          <p>Loading photos...</p>
        )}
      </div>
    );
  };
  
  export default GalleryPreview;
