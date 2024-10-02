import React, { useState, useEffect } from 'react';
import "./admin.css";
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await api.get('/admin/pending-users');
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (email) => {
    try {
      await api.post('/admin/approve', { email });
      setUsers(users.filter(user => user.email !== email));
      setFilteredUsers(filteredUsers.filter(user => user.email !== email));
    } catch (err) {
      console.error(err);
    }
  };

  const rejectUser = async (email) => {
    try {
      await api.post('/admin/reject-user', { email });
      setUsers(users.filter(user => user.email !== email));
      setFilteredUsers(filteredUsers.filter(user => user.email !== email));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(e.target.value);
    
    const filtered = users.filter(user => {
      const nameMatch = String(user.name || '').toLowerCase().includes(searchTerm);
      const emailMatch = String(user.email || '').toLowerCase().includes(searchTerm);
      const rollNoMatch = String(user.roll_no || '').toLowerCase().includes(searchTerm);
      const batchMatch = String(user.batch || '').toLowerCase().includes(searchTerm);
      const branchMatch = String(user.branch || '').toLowerCase().includes(searchTerm);
      
      return nameMatch || emailMatch || rollNoMatch || batchMatch || branchMatch;
    });
    
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
    <div className="admin-dashboard-container">
      <div className='admin-dashboard-header'>
        <h1 className='admin-dashboard-title'>ADMIN DASHBOARD</h1>
      </div>
      <div className="admin-dashboard-search-group">
        <input
          type="text"
          className="admin-dashboard-search-input"
          placeholder="Search by name, email, batch, or branch"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="admin-dashboard-search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <h2 className='admin-dashboard-section-header'>Pending User Approvals</h2>
      {filteredUsers.length > 0 ? (
        <table className="admin-dashboard-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
              <th onClick={() => handleSort('email')}>Email {getSortIndicator('email')}</th>
              <th onClick={() => handleSort('roll_no')}>Roll Number {getSortIndicator('roll_no')}</th>
              <th onClick={() => handleSort('batch')}>Batch {getSortIndicator('batch')}</th>
              <th onClick={() => handleSort('branch')}>Branch {getSortIndicator('branch')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.roll_no}</td>
                <td>{user.batch}</td>
                <td>{user.branch}</td>
                <td>
                  <button onClick={() => approveUser(user.email)} className="admin-dashboard-btn-approve">Approve</button>
                  <button onClick={() => rejectUser(user.email)} className="admin-dashboard-btn-reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="admin-dashboard-no-data">No pending approvals right now.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
