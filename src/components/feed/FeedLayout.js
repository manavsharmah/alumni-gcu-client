// components/layouts/FeedLayout.js
import React from "react";
import "./feed.css";

const FeedLayout = ({ leftSidebar, mainContent, rightSidebar }) => {
  return (
    <div className="feed-layout-container">
      <div className="left-sidebar">{leftSidebar}</div>
      <div className="main-content">{mainContent}</div>
      <div className="right-sidebar">{rightSidebar}</div>
    </div>
  );
};

export default FeedLayout;
