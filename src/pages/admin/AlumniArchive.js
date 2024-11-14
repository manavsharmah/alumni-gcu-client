import React, { useState } from 'react';
import "./admin.css";
import api from "../../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';  // For Excel download
import Papa from 'papaparse';
import Modal from "./AdminModal";

const AlumniArchive = () => {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useState({
    batch: '',
    branch: ''
  });
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const [modalContent, setModalContent] = useState(null);  // State to store dynamic modal content
  const [modalTitle, setModalTitle] = useState("");  // State for modal title

  const branches = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics and Communication Engineering',
    'Information Technology',
    'Chemical Engineering',
  ];

  const fetchFilteredUsers = async () => {
    try {
      const query = new URLSearchParams(searchParams).toString();
      const res = await api.get(`/admin/approved-users?${query}`);
      setUsers(res.data);
      setFilteredUsers(res.data);
      setSearchPerformed(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredUsers();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filtered = users.filter(user =>
      (user.name?.toLowerCase() || '').includes(searchValue) ||
      (user.email?.toLowerCase() || '').includes(searchValue) ||
      (user.batch?.toString().toLowerCase() || '').includes(searchValue) ||
      (user.branch?.toLowerCase() || '').includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
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

  // Function to download the CSV file
  const downloadCSV = () => {
    const csv = Papa.unparse(filteredUsers);  // Convert JSON to CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'alumni_data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Function to download the Excel file
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);  // Convert JSON to Excel sheet
    const wb = XLSX.utils.book_new();  // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Alumni Data");
    XLSX.writeFile(wb, 'alumni_data.xlsx');  // Download the file as 'alumni_data.xlsx'
  };

  const handleClearSearch = () => {
    setSearchParams({ batch: '', branch: '' });
    setFilteredUsers([]);
    setUsers([]);
    setSearchPerformed(false);
    setSearch('');
  };

   // Function to handle row click
   const handleRowClick = (user) => {
    // Generate detailed user content for the modal
    const userContent = (
      <>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Batch:</strong> {user.batch}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
        <p><strong>Phone:</strong> {user.phone || 'Not available'}</p>
        <p><strong>Address:</strong> {user.address || 'Not available'}</p>
        <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></p>
      </>
    );

    // Set modal title and content
    setModalTitle(`${user.name}'s Details`);
    setModalContent(userContent);
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
    setModalContent(null);  // Clear content
    setModalTitle("");  // Clear title
  };

  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
        <h1 className='admin-form-header'>Alumni Archive - Advanced Search</h1>
      </div>

      <div className="search-group">
        <form onSubmit={handleSearchSubmit}>
          <div className="admin-form-group">
            <label htmlFor="batch">Batch (Year)</label>
            <input
              type="number"
              className="admin-form-input"
              name="batch"
              id="batch"
              value={searchParams.batch}
              onChange={handleInputChange}
              placeholder="Enter Batch Year"
              min="1900"
              max={new Date().getFullYear() + 4}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="branch">Branch</label>
            <select
              name="branch"
              className="admin-form-input"
              id="branch"
              value={searchParams.branch}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="admin-form-button">Search</button>
          <button type="button" className="admin-form-button" onClick={handleClearSearch}>Clear Search</button>
        </form>
      </div>

      {searchPerformed && (
        <>
          <h2>Alumni List</h2>
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

          <div className="download-buttons">
            <button onClick={downloadCSV} className="admin-form-button">Download CSV</button>
            <button onClick={downloadExcel} className="admin-form-button">Download Excel</button>
          </div>

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
                  <tr key={user._id} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.batch}</td>
                    <td>{user.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          ) : (
            <p>No users found based on your search criteria.</p>
          )}
        </>
      )}
      <Modal
        title={modalTitle}
        content={modalContent}
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AlumniArchive;