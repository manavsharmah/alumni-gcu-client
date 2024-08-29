import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages.css";

const SingleEvent = () => {
  const { id } = useParams();
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="single-event-container">
      <h2 className="single-event-title">
        <p className="single-event-date">
            Posted on: {new Date(eventItem.posted_date).toLocaleDateString()}
        </p>
        {eventItem.title}
      </h2>
      <img
        src={eventItem.imageUrl || "./assets/default-event.jpg"} 
        alt="Event Thumbnail" 
        className="single-event-thumbnail"
      />
      <h5 className="event-organizer">Organized by: {eventItem.organizer} on <br />{new Date(eventItem.event_date).toLocaleDateString()} at {eventItem.event_time}</h5>
      <p className="single-event-content">{eventItem.content}</p>
    </div>
  );
};

export default SingleEvent;
