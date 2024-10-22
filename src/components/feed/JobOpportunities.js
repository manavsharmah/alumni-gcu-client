import React from "react";

const JobOpportunities = () => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    marginTop: "20px",
    backgroundColor: "#fff"
  };

  const titleStyle = {
    fontSize: "1.5em",
    marginBottom: "10px",
    textAlign: "center",
    color: "#333"
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  };

  const iconStyle = {
    marginRight: "10px",
    color: "#007bff",
    fontSize: "1.2em"
  };

  const textStyle = {
    fontSize: "1.1em",
    color: "#333"
  };

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>Job Opportunities</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <i className="fas fa-laptop-code" style={iconStyle}></i>
          <span style={textStyle}>Software Engineer at XYZ Corp</span>
        </li>
        <li style={itemStyle}>
          <i className="fas fa-chart-line" style={iconStyle}></i>
          <span style={textStyle}>Data Analyst at ABC Tech</span>
        </li>
        {/* Add more job opportunities here */}
      </ul>
    </div>
  );
};

export default JobOpportunities;
