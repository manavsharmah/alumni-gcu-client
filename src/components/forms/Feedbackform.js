import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import "./form.css";
import { FaEnvelope, FaAddressCard, FaCommentDots } from 'react-icons/fa';
import { MdSubject } from 'react-icons/md';

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
      const response = await axios.post('http://localhost:5000/api/feedback/submit', formData, {
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
      <div className="form-container">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>FEEDBACK FORM</h2>
          <div className="input-group">
            <label htmlFor="name"><FaAddressCard /></label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email"><FaEnvelope /></label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="subject"><MdSubject /></label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />
          </div>
          <div className="input-group">
            {/* <label htmlFor="message"><FaCommentDots /></label> */}
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              className="modal-textarea"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            SUBMIT
          </button>
        </form>

        {/* Display server response message */}
        {responseMessage && (
          <p className="alert alert-success">{responseMessage}</p>
        )}
      </div>
    </div>

    </div>
  );
};

export default FeedbackForm;
