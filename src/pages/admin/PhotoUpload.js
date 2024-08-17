import React, { useState } from 'react';
import "./admin.css"; // Import the CSS file
import api from "../../services/api"

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

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
      await api.post('/admin/upload', formData, {
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
    <div className="photo-upload-container">
      <h2 className="photo-upload-header">Upload Image</h2>
      <input type="file" onChange={handleFileChange} className="photo-upload-input" />
      <button onClick={uploadImage} className="photo-upload-button">Upload</button>
    </div>
  );
};

export default PhotoUpload;
