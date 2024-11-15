import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SingleEvent = () => {
  const { id } = useParams();
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/get-event/${id}`);
        setEventItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (eventItem && carouselRef.current) {
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
  }, [eventItem]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      <div className="single-event-container">
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

        <h2 className="single-event-title">
          <p className="single-event-date">
            Posted on: {new Date(eventItem.posted_date).toLocaleDateString()}
          </p>
          {eventItem.title}
        </h2>

        <div id="eventImageCarousel" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
          <div className="carousel-inner">
            {eventItem.images && eventItem.images.length > 0 ? (
              eventItem.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`http://localhost:5000${image}`}
                    alt={`Event Image ${index + 1}`}
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
                  src="./assets/default-event.jpg" 
                  alt="Default Event Thumbnail" 
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

          {eventItem.images && eventItem.images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#eventImageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#eventImageCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        <h5 className="event-organizer">Organized by: {eventItem.organizer} on <br />{new Date(eventItem.event_date).toLocaleDateString()} at {eventItem.event_time}</h5>
        <p className="single-event-content">{eventItem.content}</p>
      </div>
    </div>
  );
};

export default SingleEvent;