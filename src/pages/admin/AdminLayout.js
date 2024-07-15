import React from 'react';
import { Outlet } from 'react-router-dom';
import "./admin.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <ul>
          <li><a href="/admin-dashboard">Dashboard</a></li>
          <li><a href="/news-form">Create New News</a></li>
          <li><a href="/events-form">Create New Event</a></li>
          <li><a href="/">Back to Website</a></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;