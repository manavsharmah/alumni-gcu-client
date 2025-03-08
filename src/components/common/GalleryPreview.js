import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components.css';

const GalleryPreview = () => {
    const [photos, setPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [visiblePhotosCount, setVisiblePhotosCount] = useState(5);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);
    let startX = useRef(0);
    let isDragging = useRef(false);

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
        const updatePhotoCount = () => {
            setVisiblePhotosCount(window.innerWidth < 768 ? 2 : 5);
        };
        updatePhotoCount();
        window.addEventListener('resize', updatePhotoCount);
        return () => window.removeEventListener('resize', updatePhotoCount);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    useEffect(() => {
        if (photos.length > 0) {
            intervalRef.current = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
        }
        return () => clearInterval(intervalRef.current);
    }, [photos]);

    const resetAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(nextSlide, 5000);
    };

    const handleTouchStart = (e) => {
        startX.current = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging.current = true;
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        const moveX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = startX.current - moveX;

        if (diff > 50) {
            nextSlide();
            isDragging.current = false;
            resetAutoSlide();
        } else if (diff < -50) {
            setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
            isDragging.current = false;
            resetAutoSlide();
        }
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
    };

    return (
        <div className="gallery-preview-container">
            <h2 className="gallery-heading">Gallery Preview</h2>
            {photos.length > 0 ? (
                <div
                    className="carousel"
                    ref={carouselRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseMove={handleTouchMove}
                    onMouseUp={handleTouchEnd}
                    onMouseLeave={handleTouchEnd}
                >
                    {photos
                        .slice(currentIndex, currentIndex + visiblePhotosCount)
                        .concat(photos.slice(0, Math.max(0, visiblePhotosCount - (photos.length - currentIndex))))
                        .map((photo, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000${photo.image}`}
                                alt={`photo_${index}`}
                                className="item"
                                onClick={() => navigate('/gallery')}
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
