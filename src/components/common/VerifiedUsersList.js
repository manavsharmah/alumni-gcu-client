import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import api from '../../services/api';
import "../components.css";

const VerifiedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.batch?.toLowerCase().includes(search.toLowerCase()) ||
    user.branch?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="verified-users-container">
      <input 
        type="text" 
        placeholder="Search by name, batch, or branch" 
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      {error && <p className="error">{error}</p>}
      <div className="users-list">
        {filteredUsers.map(user => (
          <Link to={`/profile/${user._id}`} key={user._id} className="user-item"> {/* Wrap user item with Link */}
            <img src="https://via.placeholder.com/50" alt="Profile" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.branch}</p> ,<p>{user.batch}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VerifiedUsersList;
