import React, { useState, useEffect, useRef } from 'react';
import "./admin.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from "../../services/api";

const PhotoUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [albumName, setAlbumName] = useState('');
  const [existingAlbums, setExistingAlbums] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    //fetching existing albums
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/images/album-names');
        //sorting the albums alphabetically by albumName
        const sortedAlbums = response.data.sort((a, b) => 
          a.albumName.localeCompare(b.albumName)
        );
        setExistingAlbums(sortedAlbums);
      } catch (err) {
        console.error('Error fetching albums:', err);
        alert('Failed to fetch albums.');
      }
    };
    fetchAlbums();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  
    // Reset preview URLs before updating
    setPreviewUrls([]);
  
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prevUrls => [...prevUrls, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file.');
      return;
    }

    if (!albumName.trim()) {
      alert('Please enter an album name.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    formData.append('albumName', albumName);
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
      setAlbumName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  //Reseting the file input
      }
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }
    } catch (err) {
      console.error('Error uploading images:', err.response ? err.response.data : err);
      alert('Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="photo-upload-container text-center p-4" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2 className="mb-4">Upload Images</h2>

      <div className="mb-3">
        <select className="form-select" onChange={(e) => setAlbumName(e.target.value)} value={albumName}>
          <option value="">Select an existing album (optional)</option>
          {existingAlbums.map(album => (
            <option key={album._id} value={album.albumName}>{album.albumName}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <input
          type="text"
          value={albumName}
          onChange={handleAlbumNameChange}
          placeholder="Enter album name (For new album)"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="form-control" 
          accept="image/*"
          multiple
          ref={fileInputRef}
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center mb-3">
          {previewUrls.map((url, index) => (
            <div key={index} className="m-2">
              <img 
                src={url} 
                alt={`Preview ${index + 1}`} 
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} 
              />
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={uploadImages} 
        className="btn btn-primary w-100"
        disabled={uploading || !albumName.trim()}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default PhotoUpload;