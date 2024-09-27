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
    data.append('category', "events")

    images.forEach((image, index) => {
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
      console.log('Response:', response.data);
      setFormData({ title: '', content: '', organizer: '', event_date: '', event_time: '', images: [] }); 
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Error Creating Event');
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-header">Create Event</h2>
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
            placeholder='Event Date'
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
            placeholder='Event Time'
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
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminEventsForm;
