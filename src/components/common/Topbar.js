import React from 'react';
import "./components.css";

const Topbar = () => {
  return (
    <div className="App">
    <header className="App-header">
      <div className="logo">
        <img src="./assets/LOGO 1.jpg" alt="Girijananda Choudhury University logo" />
      </div>
      <div className="title">
        <h2>Girijananda Choudhury University</h2>
        <h2>Alumni Association</h2>
      </div>
      <div className="auth-links ml-auto d-flex align-items-center">
           <a href="/register" className="auth-link text-dark font-weight-bold ml-3">Register</a>&nbsp;
           <span>  |  </span>
           <a href="/login" className="auth-link text-dark font-weight-bold ml-3">Login</a>
      </div>
    </header>
    <nav className="navbar">
      <ul>
        <li><a href="https://www.gcucalumni.com/about.js">About</a></li>
        <li><a href="https://www.gcucalumni.com/alumniassociation.js">Alumni Achievers</a></li>
        <li><a href="https://www.gcucalumni.com/studentservice.js">Student Services</a></li>
        <li><a href="https://www.gcucalumni.com/newsroom.js">Newsroom</a></li>
        <li><a href="https://www.gcucalumni.com/events.js">Activities</a></li>
        <li><a href="https://www.gcucalumni.com/events.js">More</a></li>
        <li><a href="https://www.gcualumni.com/page/FAQs.js">FAQ's</a></li>
      </ul>
    </nav>
  </div>
);
}

export default Topbar;
