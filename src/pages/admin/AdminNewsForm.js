import React, { useState, useEffect } from 'react';
import Modal from './AdminModal';  // Reusable modal
import NewsEditModal from '../../components/common/NewsEditModal';  // Import the edit modal
import './admin.css';
import api from '../../services/api';
import SharedImagesDeleteModal from './SharedImagesDeleteModal';
import SharedImagesAddModal from './SharedImagesAddModal';
import ActionMenu from './ActionMenu';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const AdminNewsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [modalError, setModalError] = useState(''); // New state for modal-specific errors
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: []
  });
  const [isDeleteImagesModalOpen, setIsDeleteImagesModalOpen] = useState(false);
  const [selectedNewsForImages, setSelectedNewsForImages] = useState(null);
  const [isAddImagesModalOpen, setIsAddImagesModalOpen] = useState(false);
  const [selectedNewsForAddImages, setSelectedNewsForAddImages] = useState(null);

  const { title, content, images } = formData;

  const onChange = (e) => {
    if (e.target.name === 'images') {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setModalError(''); // Clear previous error messages
    
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('category', "news")//upload-images middleware requires the category so dont DELETE THIS again!!!
    images.forEach(image => {
      data.append('images', image);
    });

    try {
      await api.post('/news/upload', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' }
      });
      setMessage('News Uploaded!');
      setIsModalOpen(false);
      fetchNews(); // Refresh news list after creation
      
      // Reset form data after successful submission
      setFormData({
        title: '',
        content: '',
        images: []
      });
    } catch (error) {
      console.error('Error Creating News:', error);
      
      // Display error message inside the modal
      if (error.response && error.response.data && error.response.data.message) {
        setModalError(error.response.data.message);
      } else {
        setModalError('Error creating news. Please try again.');
      }
    }
  };

  const fetchNews = async () => {
    try {
      const response = await api.get('/news/get-news');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);
    setModalTitle(newsItem.title);
    setModalContent(
      <>
        <p><strong>Date:</strong> {new Date(newsItem.date).toLocaleDateString()}</p>
        <p><strong>Content:</strong> {newsItem.content}</p>
        <p><strong>Category:</strong> News</p>
        {newsItem.firstImage && (
          <img src={`${BASE_URL}${newsItem.firstImage}`} alt="News Thumbnail" style={{ width: '100%' }} />
        )}
      </>
    );
    setIsNewsModalOpen(true);
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  const handleEdit = (newsItem) => {
    setSelectedNews(newsItem); // Set the selected news item for editing
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleDelete = async (newsId) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await api.delete(`/news/delete/${newsId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNewsList(newsList.filter(news => news._id !== newsId));
        setMessage('News Deleted Successfully');
      } catch (error) {
        console.error('Error deleting news:', error);
        setMessage('Error deleting news');
      }
    }
  };

  const handleDeleteImages = (newsItem) => {
    setSelectedNewsForImages(newsItem);
    setIsDeleteImagesModalOpen(true);
  };

  const handleAddImages = (newsItem) => {
    setSelectedNewsForAddImages(newsItem);
    setIsAddImagesModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedNews(null); // Clear selected news after closing
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    setModalError(''); // Clear error message when closing modal
    // Optional: reset form data when closing modal
    setFormData({
      title: '',
      content: '',
      images: []
    });
  };

  return (
    <div className="admin-news-container">
      <h2>News Management</h2>
      <button className="create-news-events" onClick={() => setIsModalOpen(true)}>Create News</button>

      {/* Create News Modal */}
      <Modal
        title="Create News"
        content={(
          <form onSubmit={onSubmit} encType="multipart/form-data">
            {modalError && (
              <div className="error-message" style={{ 
                color: 'red', 
                backgroundColor: '#ffeded', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '10px',
                border: '1px solid #ff9999'
              }}>
                {modalError}
              </div>
            )}
            <input
              type='text'
              className="admin-form-input"
              placeholder='Title'
              value={title}
              onChange={onChange}
              name='title'
              required
            />
            <textarea
              className="admin-form-textarea"
              placeholder='Content'
              value={content}
              onChange={onChange}
              name='content'
              required
            />
            <label htmlFor="images">Images (Select up to 10)</label>
            <input
              type="file"
              className="admin-form-input"
              name="images"
              accept="image/*"
              onChange={onChange}
              multiple
            />
            <button type="submit" className='admin-form-button'>Create News</button>
          </form>
        )}
        isOpen={isModalOpen}
        closeModal={closeCreateModal}
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
            <tr key={newsItem._id} onClick={() => openNewsModal(newsItem)}>
              <td>
                {newsItem.firstImage ? (
                  <img src={`${BASE_URL}${newsItem.firstImage}`} alt="Thumbnail" style={{ height: '100px', objectFit: 'cover' }} />
                ) : (
                  <img src="./assets/gcu-building.jpg" alt="Default Thumbnail" style={{ height: '100px', objectFit: 'cover' }} />
                )}
              </td>
              <td>{newsItem.title}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <ActionMenu
                  onEdit={() => handleEdit(newsItem)}
                  onDelete={() => handleDelete(newsItem._id)}
                  onDeleteImages={() => handleDeleteImages(newsItem)}
                  onAddImages={() => handleAddImages(newsItem)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* News Details Modal */}
      <Modal
        title={modalTitle}
        content={modalContent}
        isOpen={isNewsModalOpen}
        closeModal={closeNewsModal}
      />

      {/* Edit News Modal */}
      {isEditModalOpen && selectedNews && (
        <NewsEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          newsItem={selectedNews}
          onNewsUpdated={() => {
            setMessage('News updated successfully');
            setIsEditModalOpen(false);
            fetchNews();
          }} 
        />
      )}

      {/* Delete Images Modal */}
      {isDeleteImagesModalOpen && selectedNewsForImages && (
        <SharedImagesDeleteModal
          isOpen={isDeleteImagesModalOpen}
          onClose={() => setIsDeleteImagesModalOpen(false)}
          itemId={selectedNewsForImages._id}
          api={api}
          onImagesDeleted={fetchNews}
          category="news"
        />
      )}

      {/* Add Images Modal */}
      {isAddImagesModalOpen && selectedNewsForAddImages && (
        <SharedImagesAddModal
          isOpen={isAddImagesModalOpen}
          onClose={() => setIsAddImagesModalOpen(false)}
          itemId={selectedNewsForAddImages._id}
          itemTitle={selectedNewsForAddImages.title}
          api={api}
          onImagesAdded={fetchNews}
          category="news"
        />
      )}
    </div>
  );
};

export default AdminNewsForm;
