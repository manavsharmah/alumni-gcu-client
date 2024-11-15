import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SingleNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/get-news/${id}`);
        setNewsItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  useEffect(() => {
    if (newsItem && carouselRef.current) {
      import('bootstrap').then(({ Carousel }) => {
        const carousel = new Carousel(carouselRef.current, {
          interval: 5000,
          wrap: true,
          keyboard: true
        });

        return () => {
          carousel.dispose();
        };
      });
    }
  }, [newsItem]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <div className="single-news-container">
        <style>
          {`
            .carousel-control-prev,
            .carousel-control-next {
              background: none !important;
              border: none !important;
              opacity: 0.7 !important;
              transition: opacity 0.1s ease !important;
            }
          `}
        </style>

        <h2 className="single-news-title">
          <p className="single-news-date">{new Date(newsItem.date).toLocaleDateString()}</p>
          {newsItem.title}
        </h2>

        <div id="newsImageCarousel" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
          <div className="carousel-inner">
            {newsItem.images && newsItem.images.length > 0 ? (
              newsItem.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`News Image ${index + 1}`}
                    className="d-block w-100"
                    style={{
                      height: "500px",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img 
                  src="./assets/gcu-building.jpg" 
                  alt="Default Thumbnail" 
                  className="d-block w-100"
                  style={{
                    height: "500px",
                    objectFit: "cover",
                    objectPosition: "center"
                  }}
                />
              </div>
            )}
          </div>

          {newsItem.images && newsItem.images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#newsImageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#newsImageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        <p className="single-news-content">{newsItem.content}</p>
      </div>
    </div>
  );
};

export default SingleNews;