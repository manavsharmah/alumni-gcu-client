import React, { useState, useEffect } from 'react';
import "./admin.css"; // Create this CSS file similar to your other styles
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const AlumniArchive = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        const res = await api.get('/admin/pending-users'); // Ensure this API route is created
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVerifiedUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filtered = users.filter(user =>
      (user.name?.toLowerCase() || '').includes(searchValue) ||
      (user.email?.toLowerCase() || '').includes(searchValue) ||
      (user.batch?.toLowerCase() || '').includes(searchValue) ||
      (user.branch?.toLowerCase() || '').includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortArray(filteredUsers, key, direction);
  };

  const sortArray = (array, key, direction) => {
    const sortedArray = [...array].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredUsers(sortedArray);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <FontAwesomeIcon icon={faSortUp} />;
      }
      return <FontAwesomeIcon icon={faSortDown} />;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
        <h1 className='dashboard-title'>Alumni Archive</h1>
      </div>
      <div className="search-group">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, batch, or branch"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <h2>Verified Alumni List</h2>
      {filteredUsers.length > 0 ? (
        <table className="user-table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
              <th onClick={() => handleSort('email')}>Email {getSortIndicator('email')}</th>
              <th onClick={() => handleSort('batch')}>Batch {getSortIndicator('batch')}</th>
              <th onClick={() => handleSort('branch')}>Branch {getSortIndicator('branch')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.batch}</td>
                <td>{user.branch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No verified alumni found.</p>
      )}
    </div>
  );
};

export default AlumniArchive;
