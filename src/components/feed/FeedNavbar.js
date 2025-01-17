import React from "react";
import "./feed.css";
import { FaUsers, FaBriefcase, FaGraduationCap, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeedNavbar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate('/welcome');
  };

  return (
    <div className="feed-sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button className="toggle-btn" onClick={() => document.querySelector(".feed-sidebar").classList.toggle("closed")}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <ul className="feed-navbar-list">
        <li className={`feed-nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => handleTabClick("home")}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "friends" ? "active" : ""}`} onClick={() => handleTabClick("friends")}>
          <FaUsers className="nav-icon" />
          <span>Friends</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "jobs" ? "active" : ""}`} onClick={() => handleTabClick("jobs")}>
          <FaBriefcase className="nav-icon" />
          <span>Jobs</span>
        </li>
        <li className={`feed-nav-item ${activeTab === "education" ? "active" : ""}`} onClick={() => handleTabClick("education")}>
          <FaGraduationCap className="nav-icon" />
          <span>Education</span>
        </li>
      </ul>
    </div>
  );
};

export default FeedNavbar;
