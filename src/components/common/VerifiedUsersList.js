import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import "./components.css";

const VerifiedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/auth/verified-users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching verified users:', error);
        setError('Error fetching verified users');
      }
    };

    fetchVerifiedUsers();
  }, []);

  return (
    <div className="verified-users-list">
      <h2>Other Alumnis</h2>
      {error && <p className="error">{error}</p>}
      <div className="users-container">
        {users.map(user => (
          <div key={user._id} className="user-item">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Biography:</strong> {user.biography}</p>
            <p><strong>Batch:</strong> {user.batch}</p>
            <p><strong>Branch:</strong> {user.branch}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedUsersList;