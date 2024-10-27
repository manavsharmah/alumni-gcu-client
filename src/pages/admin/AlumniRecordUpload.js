import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../services/api";

const BulkAddAlumni = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // Handle file change and store the file in the state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      setMessage(''); // Reset message if file is valid
    } else {
      setMessage('Please upload a valid CSV file.');
      setSelectedFile(null);
    }
  };

  // Upload the CSV file
  const uploadAlumniCSV = async () => {
    if (!selectedFile) {
      alert('Please select a CSV file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile); // Append the selected CSV file

    try {
      const response = await api.post('/admin/bulk-add-alumni', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle success
      setMessage('Alumni records uploaded successfully.');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset the file input field
      }
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err) {
      console.error('Error uploading CSV:', err.response ? err.response.data : err);
      setMessage('Failed to upload the CSV file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bulk-upload-container text-center p-4" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 className="mb-4">Bulk Add Alumni</h2>

      <div className="mb-3">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="form-control" 
          accept=".csv"
          ref={fileInputRef} // Reference to reset the input field after upload
        />
      </div>

      {selectedFile && (
        <div className="mb-3">
          <p>Selected File: {selectedFile.name}</p>
        </div>
      )}

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}

      <button 
        onClick={uploadAlumniCSV} 
        className="btn btn-primary w-100"
        disabled={uploading || !selectedFile}
      >
        {uploading ? 'Uploading...' : 'Upload CSV'}
      </button>
    </div>
  );
};

export default BulkAddAlumni;
