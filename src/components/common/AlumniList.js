import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import "../components.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const VerifiedUsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(''); // This holds the user input
  const [loading, setLoading] = useState(false); // Optional loading state

  // Handle input changes, but do not make API calls here
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Function to trigger the search when the button is clicked
  const handleSearchClick = async () => {
    if (!search.trim()) return; // Don't search for empty strings
    setLoading(true); // Optional loading state

    try {
      const response = await api.get(`/user/verified-users?search=${search}`);
      setUsers(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verified-users-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, batch, or branch"
          value={search}
          onChange={handleInputChange} // Update the input value only
          className="search-bar"
        />
        <button onClick={handleSearchClick} className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {loading && <p>Loading...</p>}
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
    </div>
  );
};

export default VerifiedUsersList;
