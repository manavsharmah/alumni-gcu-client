// components/common/FeedNavbar.js
import React from "react";
import "./feed.css";
import { FaUsers, FaBriefcase, FaGraduationCap, FaHome } from "react-icons/fa"; // Import icons

const FeedNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="feed-navbar">
      <ul className="feed-navbar-list">
        <li className={`feed-nav-item ${activeTab === "home" ? "active" : ""}`} onClick={() => setActiveTab("home")}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </li>

        {/* Friends Tab */}
        <li className={`feed-nav-item ${activeTab === "friends" ? "active" : ""}`} onClick={() => setActiveTab("friends")}>
          <FaUsers className="nav-icon" />
          <span>Friends</span>
        </li>
        
        {/* Job Opportunities Tab */}
        <li className={`feed-nav-item ${activeTab === "jobs" ? "active" : ""}`} onClick={() => setActiveTab("jobs")}>
          <FaBriefcase className="nav-icon" />
          <span>Jobs</span>
        </li>
        
        {/* Further Education Tab */}
        <li className={`feed-nav-item ${activeTab === "education" ? "active" : ""}`} onClick={() => setActiveTab("education")}>
          <FaGraduationCap className="nav-icon" />
          <span>Education</span>
        </li>
      </ul>
    </nav>
  );
};

export default FeedNavbar;
