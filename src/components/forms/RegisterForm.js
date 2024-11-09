import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../services/api';
import './form.css';


const branches = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics and Communication Engineering',
    'Information Technology',
    'Chemical Engineering',
];

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        branch: '', 
        batch: '',
        roll_no: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [emailAvailable, setEmailAvailable] = useState(true);

    const [showPassword, setShowPassword] = useState(false);

    const { name, email, phone, branch, batch, roll_no, password } = formData;

    const validateForm = () => {
        const newErrors = {};
        
        if (!name || name.length < 2) newErrors.name = "Name must be at least 2 characters long";
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please include a valid email";
        if (!phone || !/^\d{10}$/.test(phone)) newErrors.phone = "Please enter a valid 10-digit phone number";
        if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters long";
        if (!batch || !/^\d{4}$/.test(batch)) newErrors.batch = "Please enter a valid 4-digit year";
        if (!branch) newErrors.branch = "Branch is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkEmailAvailability = async (email) => {
        try {
            const response = await api.post('/user/check-email', { email });
            setEmailAvailable(response.data.available);
        } catch (err) {
            console.error(err.response.data);
        }
    };
    
    const onChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (name === 'email') {
            checkEmailAvailability(value);
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (validateForm() && emailAvailable) {
            try {
                await api.post('/user/register', formData);
                navigate('/login');
            } catch (err) {
                console.error(err.response.data);
            }
        } else if (!emailAvailable) {
            setErrors({ email: "Email is already registered" });
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='main'>
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
                    {errors.name && <small>{errors.name}</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="email">
                        <FaEnvelope />
                    </label>
                    <input type='email' id="email" name='email' placeholder='Email id' value={email} onChange={onChange} required />
                    {errors.email && <small>{errors.email}</small>}
                    {!emailAvailable && <small>Email is already registered</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">
                        <FaLock />
                    </label>
                    <input type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='Password' value={password} onChange={onChange} required />
                    <span id="togglePassword" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && <small>{errors.password}</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="phone">
                        <FaPhone />
                    </label>
                    <input type='text' id="phone" name='phone' placeholder='Phone' value={phone} onChange={onChange} required />
                    {errors.phone && <small>{errors.phone}</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="roll_no">
                        <FaUniversity />
                    </label>
                    <input type='number' id="roll_no" name='roll_no' placeholder='Roll Number' value={roll_no} onChange={onChange} required />
                    {errors.roll_no && <small>{errors.roll_no}</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="batch">
                        <FaUniversity />
                    </label>
                    <input 
                        type='number' 
                        id="batch" 
                        name='batch' 
                        placeholder='Year of Passing' 
                        value={batch} 
                        onChange={onChange} 
                        min="2006" 
                        max={new Date().getFullYear() + 4} // Assuming a valid range, you can adjust as necessary
                        required 
                    />
                    {errors.batch && <small>{errors.batch}</small>}
                </div>
                <div className="input-group">
                    <label htmlFor="branch">
                        <FaUniversity />
                    </label>
                    <select id="branch" name='branch' value={branch} onChange={onChange} required>
                        <option value='' disabled>Select Branch</option>
                        {branches.map((branchOption, index) => (
                            <option key={index} value={branchOption}>{branchOption}</option>
                        ))}
                    </select>
                    {errors.branch && <small>{errors.branch}</small>}
                </div>
                <div className="register">
                    Already Registered? <a href="/login">LOGIN!</a>
                </div>
                <button type='submit' className='submit-button' disabled={!emailAvailable}>Register</button>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register;
