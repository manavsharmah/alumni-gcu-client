import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: ''
  });

  const { email, oldPassword, newPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', formData);
      console.log(res.data);
      navigate('/home'); // Navigate to login page after successful password reset
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
        <div className='container'>
        <div className='header'>
            <div className='text'>Reset Password</div>
            <div className='underline'></div>
        </div>

        <div className='inputs'>
            <div className="input">
                <img src='' alt=''/>
                <input type='email' placeholder='Email'value={email} onChange={onChange} name='email' required/>
            </div>
        </div>
        <br></br>            
        <div className="input">
            <img src='' alt=''/>
            <input type='password' placeholder='Old Password' value={oldPassword} onChange={onChange} name='oldPassword' required/>
        </div>
        <br></br>
        <div className="input">
            <img src='' alt=''/>
            <input type='password' placeholder='New Password' value={newPassword} onChange={onChange} name='newPassword' required/>
        </div>
        
        <div className="submit-container">
            <button type='submit'>Signup</button>
        </div>
    </div>
    </form>
    
    );
}

export default ResetPassword;