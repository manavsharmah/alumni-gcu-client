import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "../components.css";

const RecommendedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const response = await api.get('/user/recommend-users'); // Call the new recommendation endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching recommended users:', error);
        setError('Error fetching recommended users');
      }
    };

    fetchRecommendedUsers();
  }, []);

  return (
    <div className="verified-users-container">
      {error && <p className="error">{error}</p>}
      <div className="users-list">
        {users.map(user => (
          <Link to={`/profile/${user._id}`} key={user._id} className="user-item">
            <img src="https://via.placeholder.com/50" alt="Profile" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.branch}</p>, <p>{user.batch}</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="find-other-mates-button">
        <Link to="/alumnidirectory">Find Other Mates</Link>
      </button>
    </div>
  );
};

export default RecommendedUsersList;
