import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../services/UserContext'; // Import UserContext
// import PhotoUpload from './PhotoUpload';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get user from context
  const [eventData, setEventData] = useState({
    title: '',
    content: '',
    organizer: '',
    event_date: '',
    event_time: '',
    posted_date: '',
  });
  const [newImages, setNewImages] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true); // Track authorization

  useEffect(() => {
    // Check if user is an admin; if not, redirect and show message
    if (user?.role !== 'admin') {
      setIsAuthorized(false);
      setTimeout(() => {
        navigate('/events'); // Redirect back to events page after 3 seconds
      }, 3000);
      return;
    }

    // Fetch existing event data if authorized
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/get-event/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [id, user, navigate]);

  // Redirect unauthorized users with a message
  if (!isAuthorized) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>You are not authorized to access this page.</h2>
        <p>Redirecting to the events page...</p>
      </div>
    );
  }

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle new image upload
  const handleImageUpload = (images) => {
    setNewImages(images);
  };

  // Submit updated event data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmEdit = window.confirm("Are you sure you want to update this event?");
    if (!confirmEdit) return;

    const formData = new FormData();
    Object.entries(eventData).forEach(([key, value]) => formData.append(key, value));
    newImages.forEach((image) => formData.append('images', image)); // Append new images

    try {
      await axios.put(`http://localhost:5000/api/events/edit/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      navigate('/events'); // Redirect to events page after editing
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="edit-event-container" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Event</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          placeholder="Title"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <textarea
          name="content"
          value={eventData.content}
          onChange={handleInputChange}
          placeholder="Content"
          rows="4"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
          }}
        ></textarea>
        <input
          type="text"
          name="organizer"
          value={eventData.organizer}
          onChange={handleInputChange}
          placeholder="Organizer"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="date"
          name="event_date"
          value={eventData.event_date}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="time"
          name="event_time"
          value={eventData.event_time}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <input
          type="date"
          name="posted_date"
          value={eventData.posted_date}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Use PhotoUpload component to upload new images
        <PhotoUpload onUploadSuccess={handleImageUpload} /> */}

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
