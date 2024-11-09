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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.querySelector('.navbar');
  //     const appHeader = document.querySelector('.App-header');

  //     if (window.innerWidth > 768) {  // Only apply on desktop view
  //       if (window.scrollY > 137) {
  //         appHeader.classList.add('sticky');
  //       } else {
  //         appHeader.classList.remove('sticky');
  //       }
  //     } else {
  //       appHeader.classList.remove('sticky'); // Remove sticky on mobile
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while the user data is being fetched
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img
                src="/assets/LOGO 1.jpg"
                alt="Girijananda Chowdhury University Alumni Association Logo"
              />
            </Link>
            
          </div>
          

        <nav className="navbar">
          <button className="menu-toggle" onClick={toggleNav}>
            &#9776;
          </button>
          <div className={`nav-content ${isNavOpen ? 'open' : ''}`}>
            <ul>
              <li>
              <Link to="#">About</Link>
                <ul className='sub-menus'>
                  <li><Link to='/overview'>Overview</Link></li>
                  <li><Link to='/vision'>Vision and Mission</Link></li>
                  <li><Link to='/objectives'>Objectives and Activities</Link></li>
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
                  {user.role === 'admin' && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}
                </>
              )}
              <li>
              <Link to='/donations'>Donations</Link>
              </li>
            </ul>
          </div>
          </nav>

          <div className="auth-links">
            {!user ? (
              <div className="auth-nav">
                <Link to="/register" className="auth-link">Register</Link>
                <span className="separator">&nbsp;|&nbsp;</span>
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
        </div>
      </header>
      
    </div>
  );
};

export default Topbar;