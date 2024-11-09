import React, { useState } from 'react';
import "../pages.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
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
      </div>
    </div>
    </div>
  );
};

export default FeedbackForm;
