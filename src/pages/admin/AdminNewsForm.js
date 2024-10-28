import React, { useState, useEffect } from 'react';
import Modal from './AdminModal';  // Reusable modal
import './admin.css';  // Assuming your styles are in this file
import api from '../../services/api';

const AdminNewsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);  // State to control modal visibility
  const [message, setMessage] = useState('');
  const [modalContent, setModalContent] = useState(null);  // To store modal content dynamically
  const [modalTitle, setModalTitle] = useState("");
  const [newsList, setNewsList] = useState([]);  // Store fetched news
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: []
  });

  const { title, content, images } = formData;

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

    images.forEach(image => {
      data.append('images', image);
    });

    try {
      const response = await api.post('/news/upload', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('News Uploaded!');
      setFormData({ title: '', content: '', images: [] });
      setIsModalOpen(false);  // Close the modal on successful submission
    } catch (err) {
      setMessage('Error Creating News');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close modal
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/news/get-news');
        setNewsList(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);  // Set the selected news item for the modal
    setModalTitle(newsItem.title);
    const newsDetails = (
      <>
        <p><strong>Date:</strong> {new Date(newsItem.date).toLocaleDateString()}</p>
        <p><strong>Content:</strong> {newsItem.content}</p>
        <p><strong>Category:</strong> News</p>
        {newsItem.firstImage && (
          <img src={`http://localhost:5000${newsItem.firstImage}`} alt="News Thumbnail" style={{ width: '100%' }} />
        )}
      </>
    );
    setModalContent(newsDetails);
    setIsNewsModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const handleEdit = (newsItem) => {
    console.log('Editing news:', newsItem._id);  // Redirect to edit page or open edit modal
  };

  const handleDelete = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await api.delete(`http://localhost:5000/api/news/delete/${newsId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNewsList(newsList.filter(news => news._id !== newsId));  // Update news list after deletion
        setMessage('News Deleted Successfully');
      } catch (error) {
        console.error('Error deleting news:', error);
        setMessage('Error deleting news');
      }
    }
  };

  return (
    <div className="admin-news-container">
      <h2>News Management</h2>
      {/* Add more content to this page as needed */}
      
      <button className="admin-button" onClick={() => setIsModalOpen(true)}>Create News</button> {/* Open modal */}

      {/* Reusable Modal Component to show form */}
      <Modal
        title="Create News"
        content={(
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
        )}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      {message && <p className="admin-form-message">{message}</p>}

      {/* News Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((newsItem) => (
            <tr key={newsItem._id} onClick={() => openNewsModal(newsItem)} style={{ cursor: 'pointer' }}>
              <td>
                {newsItem.firstImage ? (
                  <img
                    src={`http://localhost:5000${newsItem.firstImage}`}
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
              <td>{newsItem.title}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(newsItem); }} className="edit-btn">Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(newsItem._id); }} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reusable Modal for viewing news details */}
      <Modal
        title={modalTitle}
        content={modalContent}
        isOpen={isNewsModalOpen}
        closeModal={closeNewsModal}
      />
    </div>
  );
};

export default AdminNewsForm;
