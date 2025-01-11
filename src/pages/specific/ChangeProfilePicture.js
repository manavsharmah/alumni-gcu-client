import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Camera, ZoomIn, ZoomOut, Upload, Trash2 } from 'lucide-react';
import { getCroppedImg } from './cropImage';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../pages.css';

function ChangeProfilePicture() {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(''); // New state for profile photo update
    const navigate = useNavigate(); // Initialize useNavigate for routing

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(selectedFile.type)) {
                setError('Invalid file type. Only JPEG, JPG, and PNG files are allowed.');
                setImageSrc(null);
                setFile(null);
                return;
            }
            setFile(selectedFile);
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setImageSrc(reader.result);
                setError('');
            };
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSubmit = async () => {
        if (!file) {
            setError('No file selected. Please choose a file to upload.');
            return;
        }

        if (!croppedAreaPixels) {
            setError('Please crop the image before uploading.');
            return;
        }

        setError('');
        setUploadStatus('Processing image...');
        setIsUploading(true);

        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const croppedImageFile = new File([croppedImageBlob], file.name, { type: file.type });

            const formData = new FormData();
            formData.append('profilePhoto', croppedImageFile);

            setUploadStatus('Uploading image...');

            const response = await api.post('/user/upload-profile-photo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data && response.data.photoPath) {
                setProfilePhoto(response.data.photoPath);  // Update profile photo state
                setUploadStatus(response.data.message);
                resetProfilePictureState();
                setTimeout(() => {
                    navigate('/profile'); // Redirect to profile page
                }, 1000);
            } else {
                setError('Upload successful, but received an unexpected response.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setError(error.response?.data?.message || 'An error occurred while uploading the image.');
            setUploadStatus('');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveProfilePhoto = async () => {
        setUploadStatus('Removing profile photo...');
        setIsUploading(true);

        try {
            const response = await api.delete('/user/remove-profile-photo');

            if (response.data && response.data.message) {
                setProfilePhoto('');  // Clear the profile photo from state
                setUploadStatus(response.data.message);
                resetProfilePictureState();
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            } else {
                setError('Profile photo removed, but received an unexpected response.');
            }
        } catch (error) {
            console.error('Error removing profile photo:', error);
            setError(error.response?.data?.message || 'An error occurred while removing the profile photo.');
            setUploadStatus('');
        } finally {
            setIsUploading(false);
        }
    };

    const resetProfilePictureState = () => {
        setImageSrc(null);
        setFile(null);
        setCroppedAreaPixels(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
    };

    return (
        <>
            <div className="main">
              <div className='profile-photo-container'>
                <div className="profile-picture-card">
                    <div className="card-content">
                        <div className="card-title">Profile</div>
                        <h2 className="card-heading">Change Profile Picture</h2>
                        <p className="card-description">Upload a new profile picture</p>

                        <label htmlFor="dropzone-file" className="file-upload-area">
                            <div className="file-upload-text">
                                <Camera className="file-upload-icon" />
                                <p><strong>Click to upload</strong> or drag and drop</p>
                                <p>PNG, JPG or JPEG (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" style={{ display: 'none' }} onChange={onFileChange} accept="image/*" />
                        </label>

                        {error && <p className="error-message1">{error}</p>}

                        {imageSrc && (
                            <div className="cropper-container">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                        )}

                        {imageSrc && (
                            <div className="zoom-control">
                                <ZoomOut className="zoom-icon" />
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                                    className="zoom-slider"
                                />
                                <ZoomIn className="zoom-icon" />
                            </div>
                        )}

                        <div className="action-buttons">
                            <button
                                onClick={handleSubmit}
                                disabled={!croppedAreaPixels || !file || isUploading}
                                className="submit-button"
                            >
                                {isUploading ? (
                                    <>
                                        <Upload className="animate-spin" style={{ marginRight: '5px' }} />
                                        Uploading...
                                    </>
                                ) : (
                                    'Update Profile Picture'
                                )}
                            </button>
                            <button
                                onClick={handleRemoveProfilePhoto}
                                disabled={isUploading}
                                className="remove-button"
                            >
                                <Trash2 className="remove-icon" style={{ marginRight: '8px' }} />
                                Remove Current Photo
                            </button>
                        </div>

                        {profilePhoto && (
                            <img
                                src={`/${profilePhoto}`} 
                                alt="Profile"
                                className="profile-preview"
                                style={{ marginTop: '20px', borderRadius: '50%', width: '150px' }}
                            />
                        )}

                        {uploadStatus && <p className="status-message">{uploadStatus}</p>}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default ChangeProfilePicture;
