import React, { useState, useEffect } from 'react';
import '../pages.css';
import { useNavigate } from 'react-router-dom';
import Article from '../../components/common/Article-container';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/images/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          const sortedAlbums = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAlbums(sortedAlbums);
        } else {
          console.error('Unexpected data format received:', data);
        }
      } catch (err) {
        console.error('Error fetching albums:', err);
      }
    };

    fetchAlbums();
  }, []);

  if (!albums) {
    return null; 
  }

  const handleAlbumClick = (id) => {
    if (id) {
      navigate(`/album/${id}`);
    } else {
      console.error('Album ID is undefined');
    }
  };

  return (
    <div className='main'>
      <div className="page-container">
        <Article title="Gallery">
            <div className="albums-container">
              {albums.map((album) => (
                <div key={album._id} className="album-card" onClick={() => handleAlbumClick(album._id)}>
                  <img
                    src={`http://localhost:5000${album.lastImage}`}
                    alt={`${album.albumName}_thumbnail`}
                    className="album-thumbnail"
                    loading="lazy"
                  />
                  <h2 className="album-title">{album.albumName}</h2>
                </div>
              ))}
            </div>
        </Article>
      </div>
    </div>
  );
};

export default Gallery;