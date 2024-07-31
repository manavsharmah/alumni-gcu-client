import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUniversity } from 'react-icons/fa';
import api from '../../services/api';
import './form.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        branch: '', 
        batch: '',
    });

    const { name, email, phone, branch, batch } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/user/register', formData);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="form-container"> 
        <div className="register-container">
            <form className="register-form" onSubmit={onSubmit}>
                <h2>Registration</h2>
                <hr />
                <div className="input-group">
                    <label htmlFor="name">
                        <FaUser />
                    </label>
                    <input type='text' id="name" name='name' placeholder='Name' value={name} onChange={onChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">
                        <FaEnvelope />
                    </label>
                    <input type='email' id="email" name='email' placeholder='Email id' value={email} onChange={onChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">
                        <FaPhone />
                    </label>
                    <input type='text' id="phone" name='phone' placeholder='Phone' value={phone} onChange={onChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="batch">
                        <FaUniversity />
                    </label>
                    <input type='text' id="batch" name='batch' placeholder='Batch' value={batch} onChange={onChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="branch">
                        <FaUniversity />
                    </label>
                    <select id="branch" name='branch' value={branch} onChange={onChange} required>
                        <option value='' disabled>Select Branch</option>
                        <option value='Computer Science and Engineering'>Computer Science and Engineering</option>
                        <option value='Mechanical Engineering'>Mechanical Engineering</option>
                        <option value='Civil Engineering'>Civil Engineering</option>
                    </select>
                </div>
                <div className="register">
                    Already Registered? <a href="/login">LOGIN!</a>
                </div>
                <button type='submit' className='submit-button'>Register</button>
            </form>
        </div>
        </div>
    );
};

export default Register;
