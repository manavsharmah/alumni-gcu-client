import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/get-events');
        const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching Events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-cards">
    <h2 className='event-title'>EVENTS</h2>
    <ul>
        {events.map((eventItem) => (
            <li key={eventItem._id} onClick={() => navigate('/events', { state: eventItem })}>
                <h5 className="event-title-text">{eventItem.title}</h5>
                <div className="event-info">
                    <h6>Organizer: {eventItem.organizer}</h6>
                    <h7>Date: {new Date(eventItem.event_date).toLocaleDateString()}</h7>
                    <h7>Time: {eventItem.event_time}</h7>
                </div>
                <small className="event-posted-date">{new Date(eventItem.posted_date).toLocaleDateString()}</small>
            </li>
        ))}
    </ul>
</div>
                
  )
}

export default EventCard;