import React, { useState, useEffect, useRef } from 'react';
import "../components.css";
import { useUser } from '../../services/UserContext';
import { Link } from 'react-router-dom';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";
import { Camera, LogOut } from 'lucide-react';

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, loading, updateUserProfile } = useUser(); // Assuming you have a method to update the user profile
  const dropdownRef = useRef(null);

  // Toggle mobile navigation
  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    document.querySelector('.header-nav').classList.toggle('open');
  };

  // Close mobile navigation
  const closeNav = () => {
    setIsNavOpen(false);
    document.querySelector('.header-nav').classList.remove('open');
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false); 
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // If loading, show loading screen
  if (loading) {
    return <div>Loading...</div>; 
  }

  // This function will update the profile photo in the context
  const handleProfilePhotoChange = (newProfilePhoto) => {
    updateUserProfile({ ...user, profilePhoto: newProfilePhoto });
  };

  return (
    <header className="App-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/">
            <img src="/assets/LOGO 1.jpg" alt="University Alumni Logo" />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="header-nav">
          <button className="menu-toggle" onClick={toggleNav}>
            &#9776;
          </button>
          <div className={`nav-content ${isNavOpen ? 'open' : ''}`}>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
              <Link to="#">About</Link>
                <ul className='sub-menus'>
                  <li><Link to='/overview'>Overview</Link></li>
                  <li><Link to='/vision'>Vision and Mission</Link></li>
                  <li><Link to='/vcmsg'>VC Message</Link></li>
                  <li><Link to='/council'>Governing Council</Link></li>
                </ul>
              </li>
              <li><Link to="/alumnus">Association Members</Link></li>
              <li><Link to="/top-alumni">Alumni-Achievers</Link></li>
              <li><Link to="/scholarship">Scholarships</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              {user && (
                <>
                  <li><Link to="/welcome">Feed</Link></li>
                  {user.role === 'admin' && (
                    <li><Link to="/admin-stats">Admin Dashboard</Link></li>
                  )}
                </>
              )}
            </ul>
          </div>
        </nav>

        {/* Authentication Section */}
        <div className="auth-container">
          {!user ? (
            <div className="auth-links">
              <Link to="/register" className="auth-link">Register</Link>
              <span className="separator">|</span>
              <Link to="/login" className="auth-link">Login</Link>
            </div>
          ) : (
            <div className="dropdown" ref={dropdownRef}>
              {/* Profile Picture Section */}
              <div className="dropdown-toggle" onClick={toggleDropdown}>
                <ProfilePhoto userId={user._id} className="rounded-full" />
                <span className="dropdown-username">{user.name}</span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    <Camera style={{ marginRight: '8px' }} /> Profile
                  </Link>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    <LogOut style={{ marginRight: '8px' }} /> Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
