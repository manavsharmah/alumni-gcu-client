import React from 'react';
import "../components.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Bottombar = () => {
  return (
    <div className="bottombar">
      <div className="social-links">
        <a href="https://www.facebook.com/gcuniversityassam" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} style={{color: "#0851af"}} /> Facebook
        </a>
        <a href="https://x.com/GCUniversityA" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} style={{color: "#31b2f2"}} /> Twitter
        </a>
        <a href="https://in.linkedin.com/school/girijananda-chowdhury-university" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{color: "#1e67e6"}} /> LinkedIn
        </a>
        <a href="https://www.instagram.com/gcu_assam" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
      </div>
      <div className="footer-links">
        <Link to="/copyright">© Copyright 2024</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/termsofuse">Terms of Use</Link>
        <Link to="/privacypolicy">Privacy Policy</Link>
        <Link to="/alumnidirectory">Alumni Directory</Link>
      </div>
    </div>
  )
}

export default Bottombar;
