import React, { useState } from 'react';
import '../components.css';
import api from '../../services/api';

const NewsEditModal = ({ isOpen, onClose, newsItem, onNewsUpdated }) => {
  const [formData, setFormData] = useState({
    title: newsItem.title,
    content: newsItem.content,
    images: [] // For new images only
  });

  const { title, content } = formData;

  const onChange = (e) => {
    if (e.target.name === 'images') {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);

    formData.images.forEach((image) => {
      data.append('images', image);
    });

    try {
      await api.put(`/news/edit/${newsItem._id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      onNewsUpdated(); // Callback to refresh the news list
      onClose();       // Close the modal
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit News</h2>
        <form onSubmit={onSubmit} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          />
          <textarea
            name="content"
            value={content}
            onChange={onChange}
            placeholder="Content"
            rows="4"
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          ></textarea>
          {/* <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={onChange}
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }}
          /> */}
          <button
            type="submit"
            style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "white", fontSize: "16px", cursor: "pointer" }}
          >
            Update News
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginTop: "10px", padding: "10px", borderRadius: "5px", backgroundColor: "#f44336", color: "white", fontSize: "16px", cursor: "pointer" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsEditModal;