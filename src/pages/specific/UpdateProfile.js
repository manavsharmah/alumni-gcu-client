import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/api';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
// import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
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
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                </div>
                <div className="col">
                  <p><strong>Phone:</strong> {user?.phone}</p>
                  <p><strong>Batch:</strong> {user?.batch}</p>
                  <p><strong>Branch:</strong> {user?.branch}</p>
                </div>
              </div>

              {/* Update Form */}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="formBiography">Biography:</label>
                  <input className="form-control" type="text" id="formBiography" name="biography" value={biography} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formCurrentWorkingPlace">Current Working Place:</label>
                  <input className="form-control" type="text" id="formCurrentWorkingPlace" name="currentWorkingPlace" value={currentWorkingPlace} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formLinkedin">
                    <FaLinkedin size={24} className="mr-2" /> LinkedIn:
                  </label>
                  <input className="form-control" type="text" id="formLinkedin" name="linkedin" value={linkedin} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="formFacebook">
                    <FaFacebook size={24} className="mr-2" /> Facebook:
                  </label>
                  <input className="form-control" type="text" id="formFacebook" name="facebook" value={facebook} onChange={onChange} />
                </div>
                
                <div className="d-flex justify-content-center mt-3">
                  <button type="submit" className="button btn-sm">
                    Update Profile
                  </button>
                </div>
              </form>

              {/* Message Alert */}
              {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`}>
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
