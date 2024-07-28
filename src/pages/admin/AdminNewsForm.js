import React, { useState } from 'react';
import "./admin.css";
import api from '../../services/api';

const AdminNewsForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { title, content } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/news/upload', formData);
      setMessage('News Uploaded!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Creating News');
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-header">Create News</h2>
      <form onSubmit={onSubmit}>
        <div className="admin-form-group">
          <input
            type='text'
            className="admin-form-input"
            placeholder='Title'
            value={title}
            onChange={onChange}
            name='title'
            required
          />
        </div>
        <div className="admin-form-group">
          <textarea
            className="admin-form-textarea"
            placeholder='Content'
            value={content}
            onChange={onChange}
            name='content'
            required
          />
        </div>
        <button type="submit" className='admin-form-button'>Create News</button>
      </form>
      {message && <p className="admin-form-message">{message}</p>}
    </div>
  );
};

export default AdminNewsForm;
