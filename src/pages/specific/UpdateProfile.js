import React, { useState, useEffect } from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useUser } from "../../services/UserContext";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages.css';
import api from '../../services/api';
import Spinner from "../../components/common/LoadingSpinner";

const UpdateProfile = () => {
  const { user, refreshUser } = useUser(); // Added refreshUser to update context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Start with loading true
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

  // Fetch user data directly from API if context doesn't have complete data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/user/user');
        if (response && response.data) {
          const userData = response.data;
          
          // Handle achievements - convert from array to string if needed
          let achievementsStr = '';
          if (userData.achievements) {
            if (Array.isArray(userData.achievements)) {
              achievementsStr = userData.achievements.join('\n');
            } else {
              achievementsStr = userData.achievements;
            }
          }
          
          setFormData({
            biography: userData.biography || '',
            currentWorkingPlace: userData.currentWorkingPlace || '',
            address: userData.address || '',
            designation: userData.designation || '',
            achievements: achievementsStr,
            linkedin: userData.socialLinks?.linkedin || '',
            facebook: userData.socialLinks?.facebook || '',
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error('Error loading profile data');
      } finally {
        setLoading(false);
      }
    };

    // If user data is incomplete in context, fetch directly
    if (!user || !user.biography) {
      fetchUserData();
    } else {
      // Use data from context if it exists
      let achievementsStr = '';
      if (user.achievements) {
        if (Array.isArray(user.achievements)) {
          achievementsStr = user.achievements.join('\n');
        } else {
          achievementsStr = user.achievements;
        }
      }
      
      setFormData({
        biography: user.biography || '',
        currentWorkingPlace: user.currentWorkingPlace || '',
        address: user.address || '',
        designation: user.designation || '',
        achievements: achievementsStr,
        linkedin: user.socialLinks?.linkedin || '',
        facebook: user.socialLinks?.facebook || '',
      });
      setLoading(false);
    }
  }, [user]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBack = () => {
    navigate('/profile');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Process achievements back to array if needed
      let achievementsData = achievements;
      if (typeof achievements === 'string') {
        // Split by newlines and filter out empty items
        achievementsData = achievements
          .split('\n')
          .map(item => item.trim())
          .filter(item => item.length > 0);
      }
      
      await api.put('/user/update-profile', {
        biography,
        currentWorkingPlace,
        address,
        designation,
        achievements: achievementsData,
        socialLinks: { linkedin, facebook },
      });
      
      // Refresh user data in context if function exists
      if (refreshUser && typeof refreshUser === 'function') {
        await refreshUser();
      }
      
      toast.success('Profile Updated Successfully!', {
        position: "bottom-center"
      });
         
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
      
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error('Error Updating Profile', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      setLoading(false);
    }
  };

  return (
    <div className='main'>
      <ToastContainer 
        position="bottom-center" 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="modern-profile-container">
        <div className="profile-header">
          <button onClick={handleBack} className="back-button">
            &larr; Back to Profile
          </button>
          <h2 className="card-header">Update Profile</h2>
        </div>
        <div className="modern-profile-card">
          <div className="card-body">
            {loading ? (
              <Spinner />
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
                      maxLength={150}
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
                      placeholder="Enter each achievement on a new line"
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

                  <div className="button-group">
                    <button type="button" className="cancel-button" onClick={handleBack}>
                      Cancel
                    </button>
                    <button type="submit" className="update-button">
                      Update Profile
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;