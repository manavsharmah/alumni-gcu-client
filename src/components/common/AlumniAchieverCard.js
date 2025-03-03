import React from 'react';
import '../components.css'; // Assuming you have a separate CSS file for styling

const AlumniCard = ({ image, name, batch, curr_pos, curr_emp, message }) => {
  return (
    <div className="alumni-card">
      <div className="alumni-image">
        <img src={image} alt={name} />
        <div className="alumni-name">
          <h4>{name}</h4>
          <p>{batch}</p>
        </div>
      </div>
      <div className="alumni-info">
        <p>{curr_pos}</p>
        <p>{curr_emp}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AlumniCard;
