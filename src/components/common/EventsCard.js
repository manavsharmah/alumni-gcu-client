import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../../services/UserContext';

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useUser();
  const rotationInterval = 25000;

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/get-events");
        const sortedEvents = response.data.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Rotate current event being displayed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [events]);

  const handleEventClick = (eventItem) => {
    navigate(`/events/${eventItem._id}`);
  };

  const handleEdit = (e, eventItem) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/edit-event/${eventItem._id}`); // Navigate to the edit page with event ID
  };

  const handleDelete = async (e, eventId) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from local storage
    
    try {
        await axios.delete(`http://localhost:5000/api/events/delete/${eventId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        setEvents(events.filter(event => event._id !== eventId)); // Update state after deletion
    } catch (error) {
        console.error('Error deleting event:', error);
    }
  };

  // Show nothing if no events are available
  if (events.length === 0) return null;

  const currentEvent = events[currentEventIndex];

  return (
    <div className="event-card-container">
      <h2 className="news-event-title">EVENTS</h2>
      <div className="event-card" onClick={() => handleEventClick(currentEvent)}>
        {currentEvent.images && currentEvent.images.length > 0 ? (
          <img
            src={`http://localhost:5000${currentEvent.images[0]}`}
            alt="Events Thumbnail"
            className="event-card-thumbnail"
          />
        ) : (
          <img src="./assets/gcu-building.jpg" alt="Default Thumbnail" className="event-card-thumbnail" />
        )}
        <div className="event-card-content">
          <span className="event-card-label">Event</span>
          <h3 className="event-card-title">{currentEvent.title}</h3>
          <p className="event-card-organizer">Organizer: {currentEvent.organizer}</p>
          <p className="event-card-date">
            Date: {new Date(currentEvent.event_date).toLocaleDateString()} 
            <span>Time: {currentEvent.event_time}</span>
          </p>
          {/* Admin-only edit and delete buttons */}
          {user && user.role === 'admin' && (
            <div className="admin-buttons">
              <button 
                onClick={(e) => handleEdit(e, currentEvent)} 
                className="events-edit-btn"
              >
                ✏️
              </button>
              <button 
                onClick={(e) => handleDelete(e, currentEvent._id)} 
                className="events-delete-btn"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
      <span className="read-more-span" onClick={() => navigate('/events')}>
        Read more events &#8594;
      </span>
    </div>
  );
};

export default EventCard;
