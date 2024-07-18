import React, { useEffect, useState } from 'react';
import "../components.css";
import api from '../../services/api';

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  const sendRequest = async () => {
    try {
        const res = await api.get('http://localhost:5000/api/user/user');
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
        await api.post('/auth/logout');
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
          <a href="/">
            <img src="./assets/LOGO 1.jpg" alt="Girijananda Chowdhury University Alumni Association Logo" />
          </a>
        </div>
        <div className="title">
          <h2>Girijananda Chowdhury University</h2>
          <h2>Alumni Association</h2>
        </div>
        <div className='logo-gcu'>
          <img src="./assets/gcu-logo.png" alt="Girijananda Chowdhury University Logo" />
        </div>
        
        <button className="menu-toggle" onClick={toggleNav}>
          &#9776;
        </button>
      </header>
      <nav className={`navbar ${isNavOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">About</a>
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
        <div className="auth-links ml-auto d-flex align-items-center">
          {!user ? (
            <>
              <a href="/register" className="auth-link text-light font-weight-bold ml-3">Register</a>&nbsp;
              <span>  |  </span>
              <a href="/login" className="auth-link text-light font-weight-bold ml-3">Login</a>
            </>
          ) : (
            <div className="dropdown">
              <a href="/profile" className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img 
                    src="./assets/profile-placeholder.svg" 
                    alt="profile" 
                    className='rounded-full'
                />
                {user.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/update-profile">Edit Profile</a>
                <a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Topbar;
