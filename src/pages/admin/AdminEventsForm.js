import React, { useState, useEffect } from 'react';
import Modal from './AdminModal';  // Reusable modal
import EditEventModal from '../../components/common/EditEventModal';
import './admin.css';  // Assuming your styles are in this file
import api from '../../services/api';
import SharedImagesDeleteModal from './SharedImagesDeleteModal';
import SharedImagesAddModal from './SharedImagesAddModal';
import ActionMenu from './ActionMenu';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const AdminEventsForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [message, setMessage] = useState('');
  const [modalError, setModalError] = useState(''); // New state for modal-specific errors
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [eventList, setEventList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    organizer: '',
    event_date: '',
    event_time: '',
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteImagesModalOpen, setIsDeleteImagesModalOpen] = useState(false);
  const [selectedEventsForImages, setSelectedEventsForImages] = useState(null);
  const [isAddImagesModalOpen, setIsAddImagesModalOpen] = useState(false);
  const [selectedEventsForAddImages, setSelectedEventsForAddImages] = useState(null);

  const { title, content, organizer, event_date, event_time, images } = formData;

  const onChange = (e) => {
    if (e.target.name !== 'images') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setModalError(''); // Clear previous error messages
    setIsLoading(true); // Set loading to true when submission starts
    
    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    data.append('organizer', organizer);
    data.append('event_date', event_date);
    data.append('event_time', event_time);
    data.append('category', "events");
  
    images.forEach((image) => {
      data.append('images', image);
    });
  
    try {
      const response = await api.post('/events/upload', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Event Uploaded!');
      setFormData({ title: '', content: '', organizer: '', event_date: '', event_time: '', images: [] });
      setIsModalOpen(false);
      fetchEvents(); // Refresh event list after creation
    } catch (error) {
      console.error('Error Creating Event:', error);
      
      // Display error message inside the modal
      if (error.response && error.response.data && error.response.data.message) {
        setModalError(error.response.data.message);
      } else {
        setModalError('Error creating event. Please try again.');
      }
    } finally {
      setIsLoading(false); // Set loading to false when submission ends (success or error)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalError(''); // Clear error message when closing modal
    // Reset form data when closing modal
    setFormData({
      title: '',
      content: '',
      organizer: '',
      event_date: '',
      event_time: '',
      images: []
    });
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/get-events');
      setEventList(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openEventModal = (eventItem) => {
    setSelectedEvent(eventItem);
    setModalTitle(eventItem.title);
    const eventDetails = (
      <>
        <p><strong>Date:</strong> {new Date(eventItem.event_date).toLocaleDateString()} at {eventItem.event_time}</p>
        <p><strong>Content:</strong> {eventItem.content}</p>
        <p><strong>Organizer:</strong> {eventItem.organizer}</p>
        {eventItem.images && eventItem.images.length > 0 && (
          <img src={`${BASE_URL}${eventItem.images[0]}`} alt="Event Thumbnail" style={{ width: '100%' }} />
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
    setSelectedEvent(eventItem); // Set selected event data for editing
    setIsEditModalOpen(true); // Open edit modal
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/delete/${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEventList(eventList.filter(event => event._id !== eventId));
        setMessage('Event Deleted Successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
        setMessage('Error deleting event');
      }
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null); // Clear selected event after closing
  };

  const handleDeleteImages = (eventItem) => {
    setSelectedEventsForImages(eventItem);
    setIsDeleteImagesModalOpen(true);
  };

  const handleAddImages = (eventItem) => {
    setSelectedEventsForAddImages(eventItem);
    setIsAddImagesModalOpen(true);
  };

  return (
    <div className="admin-events-container">
      <h2>Event Management</h2>

      <button 
        className="create-news-events"
        style={isLoading ? {
          backgroundColor: '#7a7a7a',
          cursor: 'not-allowed',
          opacity: 0.8
        } : {}}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
      >
        Create Event
      </button>

      <Modal
        title="Create Event"
        content={(
          <form onSubmit={onSubmit}>
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
            <div className="admin-input-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="admin-form-input"
                id="title"
                placeholder="Title"
                value={title}
                onChange={onChange}
                name="title"
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                className="admin-form-input"
                placeholder="Content"
                value={content}
                onChange={onChange}
                name="content"
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="organizer">Organizer</label>
              <input
                type="text"
                className="admin-form-input"
                id="organizer"
                placeholder="Organizer"
                value={organizer}
                onChange={onChange}
                name="organizer"
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="event_date">Event Date</label>
              <input
                type="date"
                className="admin-form-input"
                id="event_date"
                value={event_date}
                onChange={onChange}
                name="event_date"
                required
              />
            </div>
            <div className="admin-input-group">
              <label htmlFor="event_time">Event Time</label>
              <input
                type="time"
                className="admin-form-input"
                id="event_time"
                value={event_time}
                onChange={onChange}
                name="event_time"
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="images">Images (Select up to 10)</label>
              <input
                type="file"
                className="admin-form-input"
                name="images"
                accept="image/*"
                onChange={onChange}
                multiple
              />
            </div>
            <button 
              type="submit" 
              className="admin-form-button"
              style={isLoading ? {
                backgroundColor: '#7a7a7a',
                cursor: 'not-allowed',
                opacity: 0.8
              } : {}}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        )}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      {message && <p className="message">{message}</p>}

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
                    src={`${BASE_URL}${eventItem.images[0]}`}
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
              <td onClick={(e) => e.stopPropagation()}>
                <ActionMenu
                  onEdit={() => handleEdit(eventItem)}
                  onDelete={() => handleDelete(eventItem._id)}
                  onDeleteImages={() => handleDeleteImages(eventItem)}
                  onAddImages={() => handleAddImages(eventItem)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Event Details Modal */}
      <Modal
        title={modalTitle}
        content={modalContent}
        isOpen={isEventModalOpen}
        closeModal={closeEventModal}
      />

      {/* Edit Event Modal */}
      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          eventId={selectedEvent._id}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onEventUpdated={() => {
            setMessage('Event updated successfully');
            closeEditModal();
            fetchEvents();
          }}
        />
      )}

      {/* Delete Images Modal */}
      {isDeleteImagesModalOpen && selectedEventsForImages && (
        <SharedImagesDeleteModal
          isOpen={isDeleteImagesModalOpen}
          onClose={() => setIsDeleteImagesModalOpen(false)}
          itemId={selectedEventsForImages._id}
          api={api}
          onImagesDeleted={fetchEvents}
          category="events"
        />
      )}

      {/* Add Images Modal */}
      {isAddImagesModalOpen && selectedEventsForAddImages && (
        <SharedImagesAddModal
          isOpen={isAddImagesModalOpen}
          onClose={() => setIsAddImagesModalOpen(false)}
          itemId={selectedEventsForAddImages._id}
          itemTitle={selectedEventsForAddImages.title}
          api={api}
          onImagesAdded={fetchEvents}
          category="events"
        />
      )}
    </div>
  );
};

export default AdminEventsForm;
