import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import api from "../../services/api";
import '../pages.css';

const UpdateProfile = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    facebook: '',
  });

  const { biography, currentWorkingPlace, linkedin, facebook } = formData;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await api.get('http://localhost:5000/api/user/user');
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          batch: user.batch,
          branch: user.branch,
        });
        setFormData({
          biography: user.biography || '',
          currentWorkingPlace: user.currentWorkingPlace || '',
          linkedin: user.socialLinks?.linkedin || '',
          facebook: user.socialLinks?.facebook || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOAuth = async (platform) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`http://localhost:5000/api/auth/${platform}-oauth`);
      console.log(`Connecting ${platform} account`, response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error connecting ${platform} account:`, error);
      setLoading(false);
      setMessage(`Error connecting ${platform} account.`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put('http://localhost:5000/api/auth/update-profile', {
        biography,
        currentWorkingPlace,
        socialLinks: { linkedin, facebook },
      });
      setMessage('Profile Updated!');
      setLoading(false);
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Updating Profile');
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-header">
          Update Profile
        </div>
        <div className="card-body">
          {loading ? (
            <div className="spinner">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* User Data Section */}
              <div className="row">
                <div className="col">
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                </div>
                <div className="col">
                  <p><strong>Phone:</strong> {userData.phone}</p>
                  <p><strong>Batch:</strong> {userData.batch}</p>
                  <p><strong>Branch:</strong> {userData.branch}</p>
                </div>
              </div>

              {/* Update Form */}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="formBiography">Biography:</label>
                  <textarea className="form-control" id="formBiography" name="biography" value={biography} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formCurrentWorkingPlace">Current Working Place:</label>
                  <input className="form-control" type="text" id="formCurrentWorkingPlace" name="currentWorkingPlace" value={currentWorkingPlace} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formLinkedin">
                    <FaLinkedin size={24} className="mr-2" /> LinkedIn:
                  </label>
                  <button type="button" className="button" onClick={() => handleOAuth('linkedin')}>
                    Connect LinkedIn
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formFacebook">
                    <FaFacebook size={24} className="mr-2" /> Facebook:
                  </label>
                  <button type="button" className="button" onClick={() => handleOAuth('facebook')}>
                    Connect Facebook
                  </button>
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="button">
                    Update Profile
                  </button>
                </div>
              </form>

              {/* Message Alert */}
              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
