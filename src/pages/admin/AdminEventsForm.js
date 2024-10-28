import React, { useState, useEffect } from 'react';
import Modal from './AdminModal';  // Reusable modal
import './admin.css';  // Assuming your styles are in this file
import api from '../../services/api';

const AdminEventsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);    // State to control modal visibility
  const [message, setMessage] = useState('');
  const [modalContent, setModalContent] = useState(null);  // To store modal content dynamically
  const [modalTitle, setModalTitle] = useState("");
  const [eventList, setEventList] = useState([]);  // Store fetched events
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    organizer: '',
    event_date: '',
    event_time: '',
    images: [],
  });

  const { title, content, organizer, event_date, event_time, images } = formData;

  const onChange = e => {
    if (e.target.name !== 'images') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('organizer', organizer);
    data.append('event_date', event_date);
    data.append('event_time', event_time);
    data.append('category', "events");

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      const response = await api.post('/events/upload', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Event Uploaded!');
      setFormData({ title: '', content: '', organizer: '', event_date: '', event_time: '', images: [] });
      setIsModalOpen(false);  // Close the modal on successful submission
    } catch (err) {
      setMessage('Error Creating Event');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/events/get-events');
        setEventList(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const openEventModal = (eventItem) => {
    setSelectedEvent(eventItem);  // Set the selected event item for the modal
    setModalTitle(eventItem.title);
    const eventDetails = (
      <>
        <p><strong>Date:</strong> {new Date(eventItem.event_date).toLocaleDateString()} at {eventItem.event_time}</p>
        <p><strong>Content:</strong> {eventItem.content}</p>
        <p><strong>Organizer:</strong> {eventItem.organizer}</p>
        {eventItem.images && eventItem.images.length > 0 && (
          <img src={`http://localhost:5000${eventItem.images[0]}`} alt="Event Thumbnail" style={{ width: '100%' }} />
        )}
      </>
    );
    setModalContent(eventDetails);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const handleEdit = (eventItem) => {
    console.log('Editing event:', eventItem._id);  // Redirect to edit page or open edit modal
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`http://localhost:5000/api/events/delete/${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEventList(eventList.filter(event => event._id !== eventId));  // Update event list after deletion
        setMessage('Event Deleted Successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
        setMessage('Error deleting event');
      }
    }
  };

  return (
    <div className="admin-events-container">
      <h2>Event Management</h2>
      {/* Add more content to this page as needed */}

      <button className="admin-button" onClick={() => setIsModalOpen(true)}>Create Event</button> {/* Open modal */}

      {/* Reusable Modal Component to show form */}
      <Modal
        title="Create Event"
        content={(
          <form onSubmit={onSubmit}>
            <div className="admin-input-group">
              <label htmlFor="title">Title</label>
              <input
                type='text'
                className="admin-form-input"
                id="title"
                placeholder='Title'
                value={title}
                onChange={onChange}
                name='title'
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                className="admin-form-input"
                placeholder='Content'
                value={content}
                onChange={onChange}
                name='content'
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="organizer">Organizer</label>
              <input
                type='text'
                className="admin-form-input"
                id="organizer"
                placeholder='Organizer'
                value={organizer}
                onChange={onChange}
                name='organizer'
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="event_date">Event Date</label>
              <input
                type='date'
                className="admin-form-input"
                id="event_date"
                value={event_date}
                onChange={onChange}
                name='event_date'
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="event_time">Event Time</label>
              <input
                type='time'
                className="admin-form-input"
                id="event_time"
                value={event_time}
                onChange={onChange}
                name='event_time'
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="images">Images (Select up to 5)</label>
              <input
                type="file"
                className="admin-form-input"
                name="images"
                accept="image/*"
                onChange={onChange}
                multiple
              />
            </div>
            <button type="submit" className='admin-form-button'>Create Event</button>
          </form>
        )}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      {message && <p className="message">{message}</p>}

      {/* Events Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((eventItem) => (
            <tr key={eventItem._id} onClick={() => openEventModal(eventItem)} style={{ cursor: 'pointer' }}>
              <td>
                {eventItem.images && eventItem.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000${eventItem.images[0]}`}
                    alt="Thumbnail"
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src="./assets/gcu-building.jpg"
                    alt="Default Thumbnail"
                    style={{ height: '100px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{eventItem.title}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(eventItem); }} className="edit-btn">Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(eventItem._id); }} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reusable Modal for viewing event details */}
      <Modal
        title={modalTitle}
        content={modalContent}
        isOpen={isEventModalOpen}
        closeModal={closeEventModal}
      />
    </div>
  );
};

export default AdminEventsForm;
