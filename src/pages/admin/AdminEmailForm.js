import React, { useState } from 'react';
import "./admin.css";

const AdminEmailForm = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle email sending logic here, e.g., using a library like EmailJS
    console.log('Email sent:', { recipientEmail, subject, message });

    // Reset form fields
    setRecipientEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="email-form-container">
      <h2 className='email-form-heading'>Send Email to User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="email-form-label" htmlFor="recipientEmail">Recipient Email</label>
          <input className='email-form-input'
            type="email"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
        <div className="email-form-group">
          <label htmlFor="subject">Subject</label>
          <input className='email-form-input'
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea className='email-textarea'
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="email-submit-button">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default AdminEmailForm;
