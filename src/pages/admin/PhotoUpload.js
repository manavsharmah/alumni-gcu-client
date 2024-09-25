import React, { useState } from 'react';
import "./admin.css";
import api from "../../services/api";

const PhotoUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs for the selected images
    const newPreviewUrls = files.map(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
      };
      reader.readAsDataURL(file);
      return reader.result;
    });

    setPreviewUrls(newPreviewUrls);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file); // Use 'images' as the field name
    });

    //explicitly append the category field as gallery
    formData.append('category', 'gallery');

    try {
      const response = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Images uploaded successfully.');
      setSelectedFiles([]);
      setPreviewUrls([]);
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err) {
      console.error('Error uploading images:', err);
      alert('Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="photo-upload-container">
      <h2 className="photo-upload-header">Upload Images</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="photo-upload-input" 
        accept="image/*"
        multiple // Allow multiple files
      />
      {previewUrls.length > 0 && (
        <div className="photo-preview">
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index + 1}`} className="preview-image" />
          ))}
        </div>
      )}
      <button 
        onClick={uploadImages} 
        className="photo-upload-button"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default PhotoUpload;
