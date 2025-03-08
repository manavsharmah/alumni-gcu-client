import React, { useState, useEffect } from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useUser } from "../../services/UserContext";
import '../pages.css';
import api from '../../services/api';

const UpdateProfile = () => {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    biography: '',
    currentWorkingPlace: '',
    address: '',
    designation: '',
    achievements: '',
    linkedin: '',
    facebook: '',
  });

  const {
    biography,
    currentWorkingPlace,
    address,
    designation,
    achievements,
    linkedin,
    facebook,
  } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        biography: user.biography || '',
        currentWorkingPlace: user.currentWorkingPlace || '',
        address: user.address || '',
        designation: user.designation || '',
        achievements: user.achievements || '',
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
      await api.put('/user/update-profile', {
        biography,
        currentWorkingPlace,
        address,
        designation,
        achievements,
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
    <div className='main'>
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
                  <label htmlFor="formAddress">Current Address:</label>
                  <input
                    className="form-input"
                    type="text"
                    id="formAddress"
                    name="address"
                    value={address}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formDesignation">Designation:</label>
                  <input
                    className="form-input"
                    type="text"
                    id="formDesignation"
                    name="designation"
                    value={designation}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formAchievements">Achievements:</label>
                  <textarea
                    className="form-input"
                    id="formAchievements"
                    name="achievements"
                    value={achievements}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formLinkedin">
                    <FaLinkedin size={24} /> LinkedIn Profile URL:
                  </label>
                  <input
                    className="form-input"
                    type="url"
                    id="formLinkedin"
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={linkedin}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="formFacebook">
                    <FaFacebook size={24} /> Facebook Profile URL:
                  </label>
                  <input
                    className="form-input"
                    type="url"
                    id="formFacebook"
                    name="facebook"
                    placeholder="https://www.facebook.com/your-profile"
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
    </div>
  );
};

export default UpdateProfile;
