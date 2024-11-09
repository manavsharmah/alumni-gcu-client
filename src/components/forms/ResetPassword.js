import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './form.css';
import { FaLock, FaEnvelope, FaEyeSlash, FaEye } from 'react-icons/fa';


const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const { email, oldPassword, newPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/user/reset-password', formData);
            navigate('/home');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    return (
        <div className='main'>
            <div className="form-container">
            <div className="reset-password-container">
                <form className="reset-password-form" onSubmit={onSubmit}>
                    <h2>Reset Password</h2>
                    <hr />
                    <div className="input-group">
                        <label htmlFor="email">
                            <FaEnvelope />
                        </label>
                        <input 
                            type='email' 
                            name='email' 
                            placeholder='Email' 
                            value={email} 
                            onChange={onChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">
                            <FaLock />
                        </label>
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            name='oldPassword' 
                            placeholder='Old Password' 
                            value={oldPassword} 
                            onChange={onChange} 
                            required 
                        />
                        <span id="togglePassword" onClick={toggleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">
                            <FaLock />
                        </label>
                        <input 
                            type={showPassword1 ? 'text' : 'password'} 
                            name='newPassword' 
                            placeholder='New Password' 
                            value={newPassword} 
                            onChange={onChange} 
                            required 
                        />
                        <span id="togglePassword" onClick={toggleShowPassword1}>
                            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type='submit' className='submit-button'>Reset Password</button>
                </form>
            </div>
            </div>
        </div>
    );
};

export default ResetPassword;
