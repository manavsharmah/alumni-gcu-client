import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Article from "../../components/common/Article-container";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "../pages.css";

const SingleAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!id) {
        setError("No album ID provided");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/images/album/${id}`
        );
        setAlbum(response.data);
      } catch (err) {
        console.error(
          "Error fetching album:",
          err.response ? err.response.data : err.message
        );
        setError(
          "Error fetching album: " +
            (err.response ? JSON.stringify(err.response.data) : err.message)
        );
      }
    };

    fetchAlbum();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!album) {
    return null; 
  }

  const slides = album.images.map((image) => ({
    src: `http://localhost:5000${image}`,
  }));

  return (
    <div className="main">
      <div className="page-container">
        <Article title="Gallery">
          <h1>{album.albumName}</h1>
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
                  src={`http://localhost:5000${image}`}
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
        </Article>
      </div>
    </div>
  );
};

export default SingleAlbum;