import React, { useState } from 'react';
import "./admin.css";
import api from '../../services/api';

const AdminNewsForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: []
  });

  const { title, content, category, images } = formData;

  const onChange = e => {
    if (e.target.name === 'images') {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage('Title and content cannot be empty');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('category', "news");

    images.forEach((image, index) => {
      data.append('images', image);
      console.log(`Image ${index + 1} appended:`, image.name);
    });

    try {
      const response = await api.post('/news/upload', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('News Uploaded!');
      console.log('Response:', response.data);
      setFormData({ title: '', content: '', category: 'news', images: [] });
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(error => `${error.path}: ${error.msg}`).join(', ');
        setMessage(`Error Creating News: ${errorMessages}`);
      } else {
        setMessage('Error Creating News: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-header">Create News</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
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
        <div className="admin-form-group">
        </div>
        <div className="admin-form-group">
          <input
            type="file"
            className="admin-form-input"
            name="images"
            accept="image/*"
            onChange={onChange}
            multiple
          />
        </div>
        <button type="submit" className='admin-form-button'>Create News</button>
      </form>
      {message && <p className="admin-form-message">{message}</p>}
    </div>
  );
};

export default AdminNewsForm;