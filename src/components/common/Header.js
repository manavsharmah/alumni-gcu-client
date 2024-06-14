import React from 'react';
import "../components.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <div className="topbar-container d-flex justify-content-between align-items-center p-3">
      
        <div className="logo-container-fluid  d-flex align-items-center">
          <a href="/home">
            <img src="" alt="GCU Alumni Association" className="logo" />
          </a>
        </div>
       
      
      <nav className="nav-links container-fluid">
        <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="">Alumni Achievers</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="">Student Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white font-weight-bold" href="">Newsroom</a>
          </li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="" >Activities</a></li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="" >More</a></li>
          <li className="nav-item"><a className="nav-link text-white font-weight-bold" href="" >FAQ's</a></li>
        </ul>
        {/* <div className="kingster-navigation-slide-bar" style="width: 47.4688px; left: 395.594px; display: block; overflow: hidden;"></div> */}
      </nav>

      <div className="auth-links ml-auto d-flex align-items-center">
          <a href="/register" className="auth-link text-white font-weight-bold ml-3">Register</a>&nbsp;
          <span>  |  </span>
          <a href="/login" className="auth-link text-white font-weight-bold ml-3">Login</a>
        </div>
    </div>
  )
}

export default Header;