import React, { useState } from 'react';
import axiosInstance from '../../services/api';

const AdminNewsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/news/upload', { title, content });
      setMessage('News created successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Error creating news');
    }
  };

  return (
    <div>
      <h2>Create News</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Create News</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminNewsForm;
