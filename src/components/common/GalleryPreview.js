import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components.css';

const GalleryPreview = () => {
    const [photos, setPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [visiblePhotosCount, setVisiblePhotosCount] = useState(5); // Default to 5 for larger screens

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/images/all-images');
                if (!response.ok) throw new Error('Failed to fetch photos');
                const data = await response.json();
                if (Array.isArray(data)) setPhotos(data);
            } catch (err) {
                console.error('Error fetching photos:', err);
            }
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }, 5000); // Change images every 5 seconds
        return () => clearInterval(interval);
    }, [photos.length]);

    // Adjust images for mobile view
    useEffect(() => {
        const updatePhotoCount = () => {
            if (window.innerWidth < 768) {
                setVisiblePhotosCount(2); // Show 2 images on mobile
            } else {
                setVisiblePhotosCount(5); // Show 5 images on larger screens
            }
        };
        updatePhotoCount();
        window.addEventListener('resize', updatePhotoCount);
        return () => window.removeEventListener('resize', updatePhotoCount);
    }, []);

    const handleImageClick = () => {
        navigate('/gallery'); 
    };

    return (
        <div className="gallery-preview-container">
            <h2 className="gallery-heading">Gallery Preview</h2>
            {photos.length > 0 ? (
                <div className="carousel">
                    {photos
                        .slice(currentIndex, currentIndex + visiblePhotosCount)
                        .concat(photos.slice(0, Math.max(0, visiblePhotosCount - (photos.length - currentIndex))))
                        .map((photo, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000${photo.image}`}
                                alt={`photo_${index}`}
                                className="item"
                                onClick={handleImageClick}
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
