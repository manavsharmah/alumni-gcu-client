import React from 'react';
import '../components.css'; // Assuming you have a separate CSS file for styling

const AlumniCard = ({ image, name, department, designation, company }) => {
  return (
    <div className="alumni-card">
      <div className="alumni-image">
        <img src={image} alt={name} />
        <div className="alumni-name">
          <h4>{name}</h4>
          <p>{department}</p>
        </div>
      </div>
      <div className="alumni-info">
        <p>{designation}</p>
        <p>{company}</p>
      </div>
    </div>
  );
};

export default AlumniCard;
