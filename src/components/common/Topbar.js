import React, { useEffect, useState } from 'react';
import "./components.css";
import axios from 'axios';
import axiosInstance from '../../services/api';

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const sendRequest = async () => {
    try {
        const res = await axiosInstance.get('http://localhost:5000/api/auth/user');
        if (res && res.data) {
            return res.data;
        } else {
            console.error('No data found in response');
            return null;
        }
    } catch (err) {
        console.error('Error during HTTP request:', err);
        return null;
    }
  };

  const handleLogout = async () => {
    try {
        await axiosInstance.post('http://localhost:5000/api/auth/logout');
        setUser(null);
    } catch (err) {
        console.error('Error during logout:', err);
    }
  };

  useEffect(() => {
      sendRequest().then((data) => {
          if (data) {
              setUser(data);
          }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img src="./assets/LOGO 1.jpg" alt="Girijananda Choudhury University logo" />
        </div>
        <div className="title">
          <h2>Girijananda Chowdhury University</h2>
          <h2>Alumni Association</h2>
        </div>
        <div className="auth-links ml-auto d-flex align-items-center">
          {!user ? (
            <>
              <a href="/register" className="auth-link text-dark font-weight-bold ml-3">Register</a>&nbsp;
              <span>  |  </span>
              <a href="/login" className="auth-link text-dark font-weight-bold ml-3">Login</a>
            </>
          ) : (
            <a href='/' onClick={handleLogout} className="auth-link text-dark font-weight-bold ml-3">Logout</a>
          )}
        </div>
        <button className="menu-toggle" onClick={toggleNav}>
          &#9776;
        </button>
      </header>
      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="https://www.gcucalumni.com/about.js">About</a>
            <ul className='sub-menus'>
              <li><a href='/overview'>Overview</a></li>
              <li><a href='/vision'>Vision and Mission</a></li>
              <li><a href='/objectives'>Objectives and Activities</a></li>
              <li><a href='/council'>Governing Council</a></li>
              <li><a href='/presidents'>Past Presidents</a></li>
              <li><a href='/chapters'>Alumni Chapters</a></li>
            </ul>
          </li>
          <li><a href="https://www.gcucalumni.com/alumniassociation.js">Get Involved</a>
          <ul className='sub-menus'>
              <li><a href='/alumnus'>Alumnus - Stake Holder Forum</a></li>
            </ul>
          </li>
          <li><a href="https://www.gcucalumni.com/alumniassociation.js">Alumni Achievers</a>
          <ul className='sub-menus'>
              <li><a href='/top-alumni'>Top Alumni in Lime Light</a></li>
              <li><a href='/notable-alumni'>Notable Alumni</a></li>
            </ul>
          </li>
          <li><a href="/scholarship">Scholarships</a></li>
          <li><a href="https://www.gcucalumni.com/newsroom.js">Newsroom</a>
            <ul className='sub-menus'>
              <li><a href='/news-archive'>News Archive</a></li>
            </ul>
          </li>
          <li><a href="/activities">Activities</a></li>
          <li><a href="https://www.gcucalumni.com/events.js">More</a>
            <ul className='sub-menus'>
              <li><a href='/gallery'>Gallery</a></li>
              <li><a href='/contact'>Contact</a></li>
            </ul>
          </li>
          <li><a href="/faq">FAQ's</a></li>
        </ul>
          {user ? (
            <>
              <a href="/profile"><h1 className='username'>{user.name}</h1></a>
            </>
          ) : (
            <p>Loading....</p>
          )}
      </nav>
    </div>
  );
}

export default Topbar;
