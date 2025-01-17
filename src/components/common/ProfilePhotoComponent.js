import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Spinner  from './LoadingSpinner'

const ProfilePhoto = ({ userId, className = '' }) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!userId) return;
      try {
        // console.log('Fetching profile photo for userId:', userId); 
        const response = await api.get(`/user/profile-photo/${userId}`);
        setProfilePhoto(response.data?.profilePhoto || null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching profile photo:', error);
          setProfilePhoto(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfilePhoto();
  }, [userId]);

  if (loading) return <div><Spinner /></div>;

  return (
    <img
      src={profilePhoto ? `http://localhost:5000/${profilePhoto.replace(/\\/g, "/")}` : `/assets/profile-placeholder.svg`}
      alt="Profile"
      className={`profile-photo ${className}`}
    />
  );
};

export default ProfilePhoto;
