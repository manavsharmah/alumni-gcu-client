import React, { useState, useEffect } from 'react';
import '../pages.css';
import Article from '../../components/common/Article-container';


const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images/get-photos');
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
      <div className="page-container">
        <Article title="Gallery">
          {photos.length > 0 ? (

                <div>
                  {photos.map((photo, index) => (
                    <img key={index} src={photo.url} alt={`photo_${index}`} className="image" />
                  ))}
                </div>
          ) : (
            <p>Loading photos...</p> 
          )}
          </Article>
        </div>  
  );
}

export default Gallery;


