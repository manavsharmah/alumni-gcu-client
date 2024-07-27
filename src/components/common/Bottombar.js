import React from 'react';
import "../components.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Bottombar = () => {
  return (
    <div className="bottombar">
      <div className="social-links">
        
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} style={{color: "#0851af",}} /> Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} style={{color: "#31b2f2",}} /> Twitter</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} style={{color: "#1e67e6",}} /> LinkedIn</a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
      </div>
      <div className="footer-links">
        <a href="#">© Copyright 2024</a>
        <a href="#">Disclaimer</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Alumni Directory</a>
      </div>
    </div>
  )
}

export default Bottombar