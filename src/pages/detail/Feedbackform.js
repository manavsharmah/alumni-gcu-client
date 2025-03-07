import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import "../pages.css";
import api from '../../services/api';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request using axios
      const response = await api.post('/feedback/submit', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Handle success - show the message from the server
      setResponseMessage(response.data.message);

      // Reset form if submission is successful
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      // Handle error and show error message
      if (error.response) {
        setResponseMessage(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setResponseMessage('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className='main'>
      <div className="page-container">
        <div className="feedback-form-container">
          <h2 className='feedback-heading'>FEEDBACK FORM</h2>
          <form onSubmit={handleSubmit}>
            <input
              className='feedback-form-input'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              className='feedback-form-input'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              className='feedback-form-input'
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />
            <textarea
              className='feedback-form-textarea'
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
            />
            <button className="feedback-form-button" type="submit">SUBMIT</button>
          </form>
          
          {/* Display server response message */}
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
