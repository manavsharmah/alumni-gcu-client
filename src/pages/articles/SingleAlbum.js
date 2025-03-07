import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "../pages.css";
import "./articles.css";
import Spinner from "../../components/common/LoadingSpinner";


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const SingleAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) {
        navigate('/404', { replace: true });
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/api/images/album/${id}`
        );
        
        if (!response.data || Object.keys(response.data).length === 0) {
          navigate('/404', { replace: true });
          return;
        }

        setAlbum(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          switch (err.response.status) {
            case 404:
              navigate('/404', { replace: true });
              return;
            case 500:
              navigate('/server-error', { replace: true });
              return;
            default:
              setError(err.message);
          }
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id, navigate]);

  if (loading) return <div><Spinner /></div>;
  if (error) return <p>{error}</p>;
  if (!album) return null;

  const slides = album.images.map((image) => ({
    src: `${BASE_URL}${image}`,
  }));

  return (
    <div className="main">
      <div className="art-container">
        <div className="about-header">
          <h1>{album.albumName}</h1>
        </div>
        <div className="goal-content-container">
          <div className="images-container">
            {album.images.map((image, index) => (
              <div
                key={index}
                className="image-wrapper"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              >
                <img
                  src={`${BASE_URL}${image}`}
                  alt={`${album.albumName}_image_${index}`}
                  className="image"
                  loading="lazy" 
                />
                <div className="image-overlay">
                  <span>Click to enlarge</span>
                </div>
              </div>
            ))}
          </div>
        </div>
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={slides}
            index={photoIndex}
            plugins={[Thumbnails, Fullscreen, Zoom, Download]}
            thumbnails={{
              position: "bottom",
              width: 120,
              height: 80,
              gap: 16,
              imageFit: "contain",
            }}
            zoom={{
              maxZoomPixelRatio: 3,
              scrollToZoom: true,
            }}
            on={{
              view: ({ index }) => setPhotoIndex(index),
            }}
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
            }}
          />
      </div>
    </div>
  );
};

export default SingleAlbum;