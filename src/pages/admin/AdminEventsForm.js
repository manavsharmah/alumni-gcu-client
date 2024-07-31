import React, { useState } from 'react';
import "../../components/components.css";
import api from '../../services/api';

const AdminEventsForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    organizer: '',
    event_date: '',
    event_time: '',
  });

  const { title, content, organizer, event_date, event_time } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events/upload', formData);
      setMessage('Event Uploaded!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Creating Event');
    }
  };

  return (
    <div className="admin-form-container">
      <h2  className="admin-form-header">Create Event</h2>
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
        <br />
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
        <br />
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
        <br />
        <div className="admin-input-group">
          <label htmlFor="event_date">Event Date</label>
          <input
            type='date'
            className="admin-form-input"
            id="event_date"
            placeholder='Event Date'
            value={event_date}
            onChange={onChange}
            name='event_date'
            required
          />
        </div>
        <br />
        <div className="admin-input-group">
          <label htmlFor="event_time">Event Time</label>
          <input
            type='time'
            className="admin-form-input"
            id="event_time"
            placeholder='Event Time'
            value={event_time}
            onChange={onChange}
            name='event_time'
          />
        </div>
        <br />
        <button type="submit" className='admin-form-button'>Create Event</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminEventsForm;
