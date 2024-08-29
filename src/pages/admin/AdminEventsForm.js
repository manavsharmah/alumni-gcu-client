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
    image: null,
  });

  const { title, content, organizer, event_date, event_time, image } = formData;

  const onChange = e => {
    if (e.target.name !== 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, image: e.target.files[0] });
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
    if (image) {
      data.append('image', image);
      console.log('Image appended:', image.name);
    }

    try {
      const response = await api.post('/events/upload', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Event Uploaded!');
      console.log('Response:', response.data);
      setFormData({ title: '', content: '', organizer: '', event_date: '', event_time: '', image: null }); 
    }
      catch (err) {
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
        <div className="admin-form-group">
          <input
            type="file"
            className="admin-form-input"
            name="image"
            accept="image/*"
            onChange={onChange}
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
