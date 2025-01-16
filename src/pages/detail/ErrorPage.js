import React from 'react';
import { Link } from 'react-router-dom';
import '../pages.css';

const ErrorPage = ({ code, title, message, buttonColor = '#0d6efd' }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title" style={{ 
          color: code === '403' ? '#dc3545' : 
                 code === '500' ? '#dc3545' :
                 '#343a40' 
        }}>
          {code}
        </h1>
        <div className="error-message">
          <h2>{title}</h2>
          <p>{message}</p>
          <Link 
            to="/" 
            className="home-button"
            style={{ 
              backgroundColor: buttonColor,
              '--hover-color': code === '403' || code === '500' ? '#bb2d3b' : '#0b5ed7'
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const NotFound = () => (
  <ErrorPage
    code="404"
    title="Page Not Found"
    message="Oops! The page you're looking for doesn't exist or has been moved."
    buttonColor="#0d6efd"
  />
);

const Forbidden = () => (
  <ErrorPage
    code="403"
    title="Access Forbidden"
    message="Sorry! You don't have permission to access this page."
    buttonColor="#dc3545"
  />
);

const ServerError = () => (
  <ErrorPage
    code="500"
    title="Internal Server Error"
    message="Oops! Something went wrong on our end. Please try again later."
    buttonColor="#dc3545"
  />
);

export { NotFound, Forbidden, ServerError, ErrorPage };