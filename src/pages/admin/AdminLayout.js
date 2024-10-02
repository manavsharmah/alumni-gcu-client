import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaNewspaper, FaCalendarAlt, FaArrowLeft, FaImages } from 'react-icons/fa';
import { MdAttachEmail } from "react-icons/md";
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-nav-bar">
      <nav className="admin-sidebar">
      {/* <div className="logo-container">
        <img src="./assets/LOGO 1.jpg"  alt="Logo" className="admin-logo" />
      </div> */}
      <ul>
        <li>
          <a href="/admin-dashboard">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/alumni-archive">
            <FaTachometerAlt />
            <span>Alumni-Archive</span>
          </a>
        </li>
        <li>
          <a href="/news-form">
            <FaNewspaper />
            <span>Create New News</span>
          </a>
        </li>
        <li>
          <a href="/events-form">
            <FaCalendarAlt />
            <span>Create New Event</span>
          </a>
        </li>
        <li>
          <a href="/photo-upload-form">
            <FaImages />
            <span>Upload Images</span>
          </a>
        </li>
        <li>
          <a href="/email-form">
            <MdAttachEmail />
            <span>Send Mail</span>
          </a>
        </li>
        <li>
          <a href="/">
            <FaArrowLeft />
            <span>Back to Website</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};


export default AdminLayout;

