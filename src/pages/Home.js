import React from 'react';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="topbar-container d-flex justify-content-between align-items-center p-3">
      
        <div className="logo-container-fluid  d-flex align-items-center">
          <a href="https://www.gcualumni.com/home.js">
            <img src="" alt="GCU Alumni Association" className="logo" />
          </a>
        </div>
       
      
      <nav className="nav-links container-fluid">
        <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="https://www.gcucalumni.com/about.js">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="https://www.gcucalumni.com/alumniassociation.js">Alumni Achievers</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="https://www.gcucalumni.com/studentservice.js">Student Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="https://www.gcucalumni.com/newsroom.js">Newsroom</a>
          </li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="https://www.gcucalumni.com/events.js" >Activities</a></li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="https://www.gcualumni.com/events.js" >More</a></li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="https://www.gcualumni.com/page/FAQs.js" >FAQ's</a></li>
        </ul>
        {/* <div className="kingster-navigation-slide-bar" style="width: 47.4688px; left: 395.594px; display: block; overflow: hidden;"></div> */}
      </nav>

      <div className="auth-links ml-auto d-flex align-items-center">
          <a href="https://www.gcualumni.com/user/signup.js" className="auth-link text-white font-weight-bold ml-3">Register</a>&nbsp;
          <span>  |  </span>
          <a href="https://www.gcualumni.com/user/login.js" className="auth-link text-white font-weight-bold ml-3">Login</a>
        </div>
    </div>
  )
}

export default Home;