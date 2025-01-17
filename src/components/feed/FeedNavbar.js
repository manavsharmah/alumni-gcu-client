import React from "react";
import "./feed.css";
import { FaUsers, FaBriefcase, FaGraduationCap, FaHome } from "react-icons/fa";

const FeedNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="feed-sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button className="toggle-btn" onClick={() => document.querySelector(".feed-sidebar").classList.toggle("closed")}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <ul className="feed-navbar-list">
        <li className={`feed-nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "friends" ? "active" : ""}`} onClick={() => setActiveTab("friends")}>
          <FaUsers className="nav-icon" />
          <span>Friends</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "jobs" ? "active" : ""}`} onClick={() => setActiveTab("jobs")}>
          <FaBriefcase className="nav-icon" />
          <span>Jobs</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "education" ? "active" : ""}`} onClick={() => setActiveTab("education")}>
          <FaGraduationCap className="nav-icon" />
          <span>Education</span>
        </li>
      </ul>
    </div>
  );
};

export default FeedNavbar;
