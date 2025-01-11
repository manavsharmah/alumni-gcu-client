import React, { useState, useEffect, useRef } from 'react';
import "../components.css";
import { useUser } from '../../services/UserContext';
import { Link } from 'react-router-dom';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, loading } = useUser();
  const dropdownRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    document.querySelector('.header-nav').classList.toggle('open');
  };

  const closeNav = () => {
    setIsNavOpen(false);
    document.querySelector('.header-nav').classList.remove('open');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false); 
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown only when clicking outside
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src="/assets/LOGO 1.jpg" alt="University Alumni Logo" />
            </Link>
          </div>

        <nav className="header-nav">
          <button className="menu-toggle" onClick={toggleNav}>
            &#9776;
          </button>
          <div className={`nav-content ${isNavOpen ? 'open' : ''}`}>
            <ul>
              <li>
              <Link to='/'>Home</Link>
              </li>
              <li>
              <Link to="#">About</Link>
                <ul className='sub-menus'>
                  <li><Link to='/overview'>Overview</Link></li>
                  <li><Link to='/vision'>Vision and Mission</Link></li>
                  <li><Link to='/vcmsg'>VC Message</Link></li>
                  <li><Link to='/council'>Governing Council</Link></li>
                </ul>
              </li>
              <li>
              <Link to='/alumnus'>Association Members</Link>
              </li>
              <li>
              <Link to='/top-alumni'>Alumni-Achievers</Link>
              </li>
              <li><Link to="/scholarship">Scholarships</Link></li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li><Link to="/events">Events</Link></li>

              <li><Link to="/gallery">Gallery</Link></li>
              {user && (
                <>
                  <li><Link to="/welcome">Feed</Link></li>
                  {user.role === 'admin' && <li><Link to="/admin-stats">Admin Dashboard</Link></li>}
                </>
              )}
              <li>
              
              </li>
            </ul>
          </div>
         </nav>

          <div className="auth-container">
            {!user ? (
              <div className="auth-links">
                <Link to="/register" className="auth-link">Register</Link>
                <span className="separator">|</span>
                <Link to="/login" className="auth-link">Login</Link>
              </div>
            ) : (
              <div className="dropdown" ref={dropdownRef}>
                <div
                  className="dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  <ProfilePhoto 
                    userId={user._id}
                    className="rounded-full"
                  />
                  <span className="dropdown-username">{user.name}</span>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/profile" onClick={() => setIsDropdownOpen(false)}>
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Topbar;
