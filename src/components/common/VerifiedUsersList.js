import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "../components.css";

const VerifiedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        const response = await api.get('/user/verified-users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching verified users:', error);
        setError('Error fetching verified users');
      }
    };

    fetchVerifiedUsers();
  }, []);

  return (
    <div className="verified-users-container"> 
      <h2>Recent Verified Users</h2>
      {error && <p className="error">{error}</p>}
      <div className="users-list"> 
        {users.map(user => (
          <div key={user._id} className="user-item">
            <img src="https://via.placeholder.com/50" alt="Profile" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p><strong>Biography:</strong> {user.biography}</p>
              <p><strong>Batch:</strong> {user.batch}</p>
              <p><strong>Branch:</strong> {user.branch}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedUsersList;
