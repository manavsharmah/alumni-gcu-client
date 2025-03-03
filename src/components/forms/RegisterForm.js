import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    const [apiError, setApiError] = useState('');

    const validateForm = () => {
        const newErrors = {};
        const currentYear = new Date().getFullYear();
        
        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2 || formData.name.length > 30) {
            newErrors.name = "Name must be between 2 and 30 characters long";
        } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        }

        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please include a valid email";
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        if (!formData.batch || !/^\d{4}$/.test(formData.batch)) {
            newErrors.batch = "Please enter a valid 4-digit year";
        } else if (formData.batch < 2006 || formData.batch > currentYear + 4) {
            newErrors.batch = `Year must be between 2006 and ${currentYear + 4}`;
        }

        if (!formData.roll_no) {
            newErrors.roll_no = "Roll number is required";
        } else if (!/^\d{1,8}$/.test(formData.roll_no)) {
            newErrors.roll_no = "Please enter a valid roll number";
        }

        if (!formData.branch) {
            newErrors.branch = "Branch is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkEmailAvailability = async (email) => {
        try {
            const response = await api.post('/user/check-email', { email });
            setEmailAvailable(response.data.available);
            return response.data.available;
        } catch (err) {
            setApiError('Unable to verify email availability. Please try again.');
            return false;
        }
    };
    
    const onChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear errors for the field being edited
        setErrors(prev => ({ ...prev, [name]: '' }));
        setApiError('');
    };

    const onSubmit = async e => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) return;

        const emailOk = await checkEmailAvailability(formData.email);

        if (emailOk) {
            try {
                await api.post('/user/register', formData);
                // Clear form data after successful registration
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    branch: '', 
                    batch: '',
                    roll_no: '',
                    password: ''
                });
                navigate('/login');
            } catch (err) {
                setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
            }
        } else {
            setErrors(prev => ({ ...prev, email: "Email is already registered" }));
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='main'>
        <div className="form-container"> 
        <div className="register-container">
            <form className="register-form" onSubmit={onSubmit} noValidate>
                <h2>Registration</h2>
                <hr />
                {apiError && <div className="error-message" role="alert">{apiError}</div>}
                
                <div className="input-group">
                    <label htmlFor="name">
                        <FaUser aria-hidden="true" />
                        <span className="sr-only">Name</span>
                    </label>
                    <input
                        type='text'
                        id="name"
                        name='name'
                        placeholder='Name'
                        value={formData.name}
                        onChange={onChange}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        required
                    />
                    {errors.name && <small id="name-error" role="alert">{errors.name}</small>}
                </div>

                <div className="input-group">
                    <label htmlFor="email">
                        <FaEnvelope aria-hidden="true" />
                        <span className="sr-only">Email</span>
                    </label>
                    <input
                        type='email'
                        id="email"
                        name='email'
                        placeholder='Email id'
                        value={formData.email}
                        onChange={onChange}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                    />
                    {errors.email && <small id="email-error" role="alert">{errors.email}</small>}
                </div>

                <div className="input-group">
                    <div className="password-input-wrapper">
                        <FaLock className="password-icon" aria-hidden="true" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={onChange}
                            aria-required="true"
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            autoComplete="new-password"
                            required
                        />
                        <button 
                            type="button"
                            onClick={toggleShowPassword}
                            className="password-toggle-button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                        </button>
                    </div>
                    {errors.password && <small id="password-error" role="alert">{errors.password}</small>}
                </div>

                <div className="input-group">
                    <label htmlFor="phone">
                        <FaPhone aria-hidden="true" />
                        <span className="sr-only">Phone</span>
                    </label>
                    <input
                        type='tel'
                        id="phone"
                        name='phone'
                        placeholder='Phone'
                        value={formData.phone}
                        onChange={onChange}
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        required
                    />
                    {errors.phone && <small id="phone-error" role="alert">{errors.phone}</small>}
                </div>

                <div className="input-group">
                    <label htmlFor="roll_no">
                        <FaUniversity aria-hidden="true" />
                        <span className="sr-only">Roll Number</span>
                    </label>
                    <input
                        type='number'
                        id="roll_no"
                        name='roll_no'
                        placeholder='Roll Number'
                        value={formData.roll_no}
                        onChange={onChange}
                        aria-required="true"
                        aria-invalid={!!errors.roll_no}
                        aria-describedby={errors.roll_no ? "roll-error" : undefined}
                        required
                    />
                    {errors.roll_no && <small id="roll-error" role="alert">{errors.roll_no}</small>}
                </div>

                <div className="input-group">
                    <label htmlFor="batch">
                        <FaUniversity aria-hidden="true" />
                        <span className="sr-only">Year of Passing</span>
                    </label>
                    <input 
                        type='number'
                        id="batch"
                        name='batch'
                        placeholder='Year of Passing'
                        value={formData.batch}
                        onChange={onChange}
                        min="2006"
                        max={new Date().getFullYear() + 4}
                        aria-required="true"
                        aria-invalid={!!errors.batch}
                        aria-describedby={errors.batch ? "batch-error" : undefined}
                        required
                    />
                    {errors.batch && <small id="batch-error" role="alert">{errors.batch}</small>}
                </div>

                <div className="input-group">
                    <label htmlFor="branch">
                        <FaUniversity aria-hidden="true" />
                        <span className="sr-only">Branch</span>
                    </label>
                    <select
                        id="branch"
                        name='branch'
                        value={formData.branch}
                        onChange={onChange}
                        aria-required="true"
                        aria-invalid={!!errors.branch}
                        aria-describedby={errors.branch ? "branch-error" : undefined}
                        required
                    >
                        <option value='' disabled>Select Branch</option>
                        {branches.map((branchOption, index) => (
                            <option key={index} value={branchOption}>{branchOption}</option>
                        ))}
                    </select>
                    {errors.branch && <small id="branch-error" role="alert">{errors.branch}</small>}
                </div>

                <div className="register">
                    Already Registered? <Link to="/login">LOGIN!</Link>
                </div>

                <button
                    type='submit'
                    className='submit-button'
                    disabled={!emailAvailable}
                    aria-disabled={!emailAvailable}
                >
                    Register
                </button>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register;