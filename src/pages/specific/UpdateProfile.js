import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';

const UpdateProfile = () => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: '',
    branch: '',
  });
  const [formData, setFormData] = useState({
    biography: '',
    currentWorkingPlace: '',
    linkedin: '',
    facebook: ''
  });

  const { biography, currentWorkingPlace, linkedin, facebook } = formData;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/auth/user');
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          batch: user.batch,
          branch: user.branch
        });
        setFormData({
          biography: user.biography || '',
          currentWorkingPlace: user.currentWorkingPlace || '',
          linkedin: user.socialLinks?.linkedin || '',
          facebook: user.socialLinks?.facebook || ''
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('http://localhost:5000/api/auth/update-profile', {
        biography,
        currentWorkingPlace,
        socialLinks: { linkedin, facebook }
      });
      setMessage('Profile Updated!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Updating Profile');
    }
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Batch:</strong> {userData.batch}</p>
        <p><strong>Branch:</strong> {userData.branch}</p>
      </div>
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label>Biography:</label>
          <textarea name="biography" value={biography} onChange={onChange} />
        </div>
        <div className="field">
          <label>Current Working Place:</label>
          <input type="text" name="currentWorkingPlace" value={currentWorkingPlace} onChange={onChange} />
        </div>
        <div className="field">
          <label>LinkedIn:</label>
          <input type="text" name="linkedin" value={linkedin} onChange={onChange} />
        </div>
        <div className="field">
          <label>Facebook:</label>
          <input type="text" name="facebook" value={facebook} onChange={onChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
