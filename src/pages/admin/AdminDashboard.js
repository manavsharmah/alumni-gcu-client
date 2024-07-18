import React, { useState, useEffect } from 'react';
import "../pages.css";
import axios from 'axios';
// import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Admindashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/pending-users');
        setUsers(res.data);
        setFilteredUsers(res.data); // Set initial filtered users
      } catch (err) {
        console.error(err); // Handle the error appropriately
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (email) => {
    try {
      await axios.post('http://localhost:5000/api/auth/approve', { email });
      setUsers(users.filter(user => user.email !== email));
      setFilteredUsers(filteredUsers.filter(user => user.email !== email)); // Update filtered users as well
    } catch (err) {
      console.error(err); // Handle the error appropriately
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post('http://localhost:5000/api/auth/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded successfully.');
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image.');
    }
  };


  return (
    <div className="admin-container mt-5 admin-dashboard">
      <div className="row justify-content-center mb-3">
        <div className="col-md-6 col-lg-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='admin-header'>
        <h1 className='admin-heading'>ADMIN DASHBOARD</h1>
      </div>
      <h2>Pending User Approvals</h2>
      {filteredUsers.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => approveUser(user.email)} className="btn btn-success mr-2">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending approvals right now.</p>
      )}
      <div className="mt-5">
        <h2>Upload Image</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadImage} className="btn btn-primary mt-2">Upload</button>
      </div>
    </div>
  );
};

export default Admindashboard;