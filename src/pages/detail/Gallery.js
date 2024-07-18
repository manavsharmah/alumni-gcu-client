import React, { useState, useEffect } from 'react';
import '../pages.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        //Checking if data is an array before setting photos
        if (Array.isArray(data)) {
          setPhotos(data);
        } else {
          console.error('Unexpected data format received');
          //Handle unexpected data
        }
      } catch (err) {
        console.error('Error fetching photos:', err);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-10">
          <h2 className="title">Gallery</h2>
          {photos.length > 0 ? (
            <div className="card">
              <div className="card-body">
                <div>
                  {photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`photo_${index}`} className="image" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading photos...</p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;