import React, { useEffect, useState } from 'react';
import "../pages.css"; // Ensure your CSS file includes the styles provided
import api from '../../services/api';

const AdminFeedbackPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch feedbacks from the server (admin only)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get('/feedback'); // Use Axios instance
        setFeedbacks(response.data); // Store feedback data in state
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to fetch feedback');
      }
    };

    fetchFeedbacks();
  }, []);

  // Function to handle feedback deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
        try {
        await api.delete(`/feedback/${id}`); // Use Axios instance for DELETE request

        // Remove deleted feedback from the UI
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
        } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to delete feedback');
        }
    }
  };

  return (
    <div className='admin-events-container'>
      <h2 className='admin-dashboard-title'>Admin Feedback Panel</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <table className='admin-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.subject}</td>
              <td>{feedback.message}</td>
              <td>{new Date(feedback.date).toLocaleString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedbackPanel;
