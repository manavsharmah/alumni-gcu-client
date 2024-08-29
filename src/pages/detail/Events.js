import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages.css'; // Ensure this CSS file contains the shared styles for both lists

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/get-events");
        const sortedEvents = response.data.sort(
          (a, b) => new Date(b.posted_date) - new Date(a.posted_date)
        );
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEventClick = (eventItem) => {
    navigate(`/events/${eventItem._id}`); // Update based on your routing setup
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);

  //Here we are using similar styling as newsArchive so the class names might look different
  return (
    <div className="news-container">
      <h2 className="news-title">Events Category</h2>
      <div className="news-list">
        {currentEvents.map((eventItem) => (
          <div
            key={eventItem._id}
            className="news-item"
            onClick={() => handleEventClick(eventItem)}
          >
            <div className="news-thumbnail">
              <img
                src={eventItem.imageUrl || "./assets/default-event.jpg"} // Add a default image for events
                alt="Event Thumbnail"
              />
            </div>
            <div className="news-content">
              <h3 className="news-headline">{eventItem.title}</h3>
              <p className="news-date">
                {new Date(eventItem.event_date).toLocaleDateString()} at{" "}
                {eventItem.event_time}
              </p>
              <p className="news-summary">
                {eventItem.content.substring(0, 100)}...
              </p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-number ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventList;
