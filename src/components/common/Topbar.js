import React, { useState, useEffect } from 'react';
import "../components.css";
import { useUser } from '../../services/UserContext';
import { Link } from 'react-router-dom';
import ProfilePhoto from "../../components/common/ProfilePhotoComponent";

const Topbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, loading } = useUser();

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
    document.querySelector('.navbar').classList.toggle('open');
  };

  const closeNav = () => {
    setIsNavOpen(false);
    document.querySelector('.navbar').classList.remove('open');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false); // Close dropdown after logout
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const closeDropdown = () => setIsDropdownOpen(false); // Close on Profile Click

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-content li a');
    navItems.forEach((item) => item.addEventListener('click', closeNav));

    return () => {
      navItems.forEach((item) => item.removeEventListener('click', closeNav));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 137) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while the user data is being fetched
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <Link to="/">
            <img
              src="/assets/LOGO 1.jpg"
              alt="Girijananda Chowdhury University Alumni Association Logo"
            />
          </Link>
          
        </div>
        <div className="title">
          <h2>Girijananda Chowdhury University</h2>
          <h2>Alumni Association</h2>
        </div>
        <div className="logo-gcu">
          <img src="/assets/gcu-logo.png" alt="Girijananda Chowdhury University Logo" />
        </div>
      </header>

      <nav className="navbar">
        <button className="menu-toggle" onClick={toggleNav}>
          &#9776;
        </button>
        <div className={`nav-content ${isNavOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="#">About</Link>
              <ul className="sub-menus">
                <li><Link to="/overview">Overview</Link></li>
                <li><Link to="/vision">Vision and Mission</Link></li>
                <li><Link to="/objectives">Objectives and Activities</Link></li>
                <li><Link to="/council">Governing Council</Link></li>
                <li><Link to="/presidents">Past Presidents</Link></li>
                <li><Link to="/chapters">Alumni Chapters</Link></li>
              </ul>
            </li>
            <li>
              <Link to="#">Get Involved</Link>
              <ul className="sub-menus">
                <li><Link to="/alumnus">Alumnus - Stake Holder Forum</Link></li>
              </ul>
            </li>
            <li>
              <Link to="#">Alumni Achievers</Link>
              <ul className="sub-menus">
                <li><Link to="/top-alumni">Top Alumni in Lime Light</Link></li>
                <li><Link to="/notable-alumni">Notable Alumni</Link></li>
              </ul>
            </li>
            <li><Link to="/scholarship">Scholarships</Link></li>
            <li>
              <Link to="#">Newsroom</Link>
              <ul className="sub-menus">
                <li><Link to="/news">News Archive</Link></li>
              </ul>
            </li>
            <li><Link to="/activities">Activities</Link></li>
            <li>
              <Link to="#">More</Link>
              <ul className="sub-menus">
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/donations">Donations</Link></li>
              </ul>
            </li>
            <li><Link to="/faq">FAQ's</Link></li>
            {user && (
              <>
                <li><Link to="/welcome">Feed</Link></li>
                {user.role === 'admin' && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
              </>
            )}
          </ul>
        </div>

        <div className="auth-links">
          {!user ? (
            <div className="auth-nav">
              <Link to="/register" className="auth-link">Register</Link>&nbsp;|&nbsp;
              <Link to="/login" className="auth-link">Login</Link>
            </div>
          ) : (
            <div className="dropdown">
              <div
                className="dropdown-toggle"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <ProfilePhoto 
                  userId={user._id}
                  className="rounded-full"
                />
                <span className="dropdown-username">{user.name}</span>
              </div>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <Link className="dropdown-item" to={`/profile`} onClick={closeDropdown}>
                  Profile
                </Link>
                <Link className="dropdown-item" to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Topbar;
