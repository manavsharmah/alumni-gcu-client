import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events/get-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching Events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container" >
        <div className='row justify-content-center'>
        <div className='col-md-6 col-10'>
            <h2 className='title'>Events </h2>
            <div class="card">
                <div className='card-body'>
                {/* <h2 className='card-title text-center'>Top Alumni in the Lime Light</h2> */}
                <div>
                  <ul>
                    {events.map((eventItem) => (
                      <li key={eventItem._id}>
                        <h3>{eventItem.title}</h3>
                        <p>{eventItem.content}</p>
                        <h6>Event Organizer: {eventItem.organizer}</h6>
                        <h6>Event Date: {Date(eventItem.event_date).toLocaleString()}</h6>
                        <h6>Event Time: {eventItem.event_time}</h6>
                        <small>{new Date(eventItem.posted_date).toLocaleString()}</small>
                      </li>
                    ))}
                  </ul>                
                </div>         
            </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default EventList;