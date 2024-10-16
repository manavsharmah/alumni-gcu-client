import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useUser } from "../../services/UserContext";
import '../pages.css';

const UpdateProfile = () => {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    biography: '',
    currentWorkingPlace: '',
    linkedin: '',
    facebook: '',
  });

  const { biography, currentWorkingPlace, linkedin, facebook } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        biography: user.biography || '',
        currentWorkingPlace: user.currentWorkingPlace || '',
        linkedin: user.socialLinks?.linkedin || '',
        facebook: user.socialLinks?.facebook || '',
      });
    }
  }, [user]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put('http://localhost:5000/api/user/update-profile', {
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
    <div className="modern-profile-container">
      <h2 className="card-header">Update Profile</h2>
      <div className="modern-profile-card">
        

        <div className="card-body">
          {loading ? (
            <div className="spinner">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* User Info Section */}
              <div className="user-info">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Batch:</strong> {user?.batch}</p>
                <p><strong>Branch:</strong> {user?.branch}</p>
              </div>

              {/* Update Form */}
              <form onSubmit={onSubmit} className="update-form">
                <div className="form-group">
                  <label htmlFor="formBiography">Biography:</label>
                  <textarea
                    className="form-input"
                    id="formBiography"
                    name="biography"
                    value={biography}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formCurrentWorkingPlace">Current Working Place:</label>
                  <input
                    className="form-input"
                    type="text"
                    id="formCurrentWorkingPlace"
                    name="currentWorkingPlace"
                    value={currentWorkingPlace}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formLinkedin">
                    <FaLinkedin size={24} /> LinkedIn:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="formLinkedin"
                    name="linkedin"
                    value={linkedin}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formFacebook">
                    <FaFacebook size={24} /> Facebook:
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="formFacebook"
                    name="facebook"
                    value={facebook}
                    onChange={onChange}
                  />
                </div>

                <button type="submit" className="update-button">
                  Update Profile
                </button>
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
