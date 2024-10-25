import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages.css';
import { UserContext } from '../../services/UserContext'; // Import your UserContext

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Assume this provides user details including admin status

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
    navigate(`/events/${eventItem._id}`);
  };

 //  const handleEdit = (eventItem) => {
//     navigate(`/edit-event/${eventItem._id}`); // Assuming you have a route for editing events
//   };

const handleDelete = async (eventId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return; // Exit if the user cancels

  try {
      await axios.delete(`http://localhost:5000/api/events/delete/${eventId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(events.filter(event => event._id !== eventId)); // Update the state after deletion
  } catch (error) {
      console.error('Error deleting event:', error);
  }
};

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="news-container">
      <h2 className="news-title">Events Category</h2>
      <div className="news-list">
        {currentEvents.map((eventItem) => (
          <div key={eventItem._id} className="news-item">
            <div className="news-thumbnail" onClick={() => handleEventClick(eventItem)}>
              {eventItem.images && eventItem.images.length > 0 ? (
                <img
                  src={`http://localhost:5000${eventItem.images[0]}`}
                  alt="Events Thumbnail"
                />
              ) : (
                <img src="./assets/gcu-building.jpg" alt="Default Thumbnail" />
              )}
            </div>
            <div className="news-content">
              <h3 className="news-headline">{eventItem.title}</h3>
              <p className="news-date">
                {new Date(eventItem.event_date).toLocaleDateString()} at {eventItem.event_time}
              </p>
              <p className="news-summary">
                {eventItem.content.substring(0, 100)}...
              </p>
              {user && user.role === 'admin' && ( // Show buttons only if the user is an admin
                <div className="admin-buttons">
                  {/* <button onClick={() => handleEdit(eventItem)} className="edit-btn">✏️</button> */}
                  <button onClick={() => handleDelete(eventItem._id)} className="events-delete-btn">🗑️</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
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
