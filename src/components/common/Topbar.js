import React, { useState } from 'react';
import "../components.css";
import { useUser } from '../../services/UserContext';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout, loading } = useUser(); // Use the custom hook to get the user data

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
  } catch (err) {
      console.error('Error during logout:', err);
  }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while the user data is being fetched
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <Link to="/">
            <img src="./assets/LOGO 1.jpg" alt="Girijananda Chowdhury University Alumni Association Logo" />
          </Link>
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
          <li>
            <Link to="#">About</Link>
            <ul className='sub-menus'>
              <li><Link to='/overview'>Overview</Link></li>
              <li><Link to='/vision'>Vision and Mission</Link></li>
              <li><Link to='/objectives'>Objectives and Activities</Link></li>
              <li><Link to='/council'>Governing Council</Link></li>
              <li><Link to='/presidents'>Past Presidents</Link></li>
              <li><Link to='/chapters'>Alumni Chapters</Link></li>
            </ul>
          </li>
          <li>
            <Link to="https://www.gcucalumni.com/alumniassociation.js">Get Involved</Link>
            <ul className='sub-menus'>
              <li><Link to='/alumnus'>Alumnus - Stake Holder Forum</Link></li>
            </ul>
          </li>
          <li>
            <Link to="https://www.gcucalumni.com/alumniassociation.js">Alumni Achievers</Link>
            <ul className='sub-menus'>
              <li><Link to='/top-alumni'>Top Alumni in Lime Light</Link></li>
              <li><Link to='/notable-alumni'>Notable Alumni</Link></li>
            </ul>
          </li>
          <li><Link to="/scholarship">Scholarships</Link></li>
          <li>
            <Link to="https://www.gcucalumni.com/newsroom.js">Newsroom</Link>
            <ul className='sub-menus'>
              <li><Link to='/news-archive'>News Archive</Link></li>
            </ul>
          </li>
          <li><Link to="/activities">Activities</Link></li>
          <li>
            <Link to="https://www.gcucalumni.com/events.js">More</Link>
            <ul className='sub-menus'>
              <li><Link to='/gallery'>Gallery</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </li>
          <li><Link to="/faq">FAQ's</Link></li>
        </ul>
        <div className="auth-links ml-auto d-flex align-items-center">
          {!user ? (
            <>
              <Link to="/register" className="auth-link text-light font-weight-bold ml-3">Register</Link>&nbsp;
              <span>  |  </span>
              <Link to="/login" className="auth-link text-light font-weight-bold ml-3">Login</Link>
            </>
          ) : (
            <div className="dropdown">
              <Link to="/profile" className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img 
                  src="./assets/profile-placeholder.svg" 
                  alt="profile" 
                  className='rounded-full'
                />
                {user.name}
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/update-profile">Edit Profile</Link>
                <Link className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
