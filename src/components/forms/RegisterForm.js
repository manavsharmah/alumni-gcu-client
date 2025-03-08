import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../services/api';
import './form.css';

const branches = [
    "B.Tech in Civil Engineering",
    "B.Tech in Computer Science and Engineering",
    "B.Tech in Mechanical Engineering",
    "B.Tech in Electrical Engineering",
    "B.Tech in Electronics and Communication Engineering",
    "B.Tech for Working Professional in Computer Science and Engineering",
    "B.Tech for Working Professional in Mechanical Engineering",
    "B.Tech for Working Professional in Electrical Engineering",
    "BCA in Computer Applications",
    "B.Pharm in Pharmacy",
    "B.Pharm in Pharmacy Practice",
    "BPT in Physiotherapy",
    "B.Sc. in Physics",
    "B.Sc. in Chemistry",
    "B.Sc. in Mathematics",
    "B.Sc. in Zoology",
    "B.Sc. in Botany",
    "B.Sc. in Fire and Safety",
    "B.Sc. in Agriculture",
    "B.Sc. in Hospitality and Hotel Management",
    "B.A. in Sociology",
    "B.A. in Psychology",
    "B.Sc. in Psychology",
    "B.A. in English",
    "B.A. in Political Science",
    "B.A. in History",
    "B.A. in Education",
    "B.A./B.Sc. in Economics",
    "BBA in Business Administration",
    "BSW in Social Work",
    "BMLT in Medical Laboratory Technology",
    "B.Com in Commerce",
    "B.A. in Journalism and Mass Communication",
    "M.Tech in Computer Science and Engineering",
    "M.Tech for Working Professional in Computer Science and Engineering",
    "M.Tech for Working Professional in Civil Engineering",
    "M.Tech in VLSI Design and Embedded Systems",
    "M.Tech in Structural Engineering",
    "M.Tech in Thermal & Fluid Engineering",
    "MCA in Computer Applications",
    "MBA in Business Administration",
    "M.Pharm in Pharmaceutics",
    "M.Pharm in Pharmacology",
    "M.Pharm in Pharmaceutical Chemistry",
    "M.Pharm in Pharmacognosy",
    "M.Sc. in Computer Science with Specialization in AI / Data Science / Cyber Security",
    "M.Sc. in Physics",
    "M.Sc. in Chemistry",
    "M.Sc. in Mathematics",
    "M.Sc. in Zoology",
    "M.Sc. in Psychology",
    "M.Sc. in Botany",
    "M.A. in Sociology",
    "M.A. in Psychology",
    "M.A. in English",
    "M.A. in Political Science",
    "M.A. in Economics",
    "MSW in Social Work",
    "M.Com in Commerce",
    "MMLT in Medical Laboratory Technology",
    "MPT in Physiotherapy",
    "M.A. in Journalism and Mass Communication",
    "M.A. in Education",
    "M.A. in History",
    "LLM in Law",
    "Ph.D. in English",
    "Ph.D. in Comparative Literature",
    "Ph.D. in Economics",
    "Ph.D. in Gender Studies",
    "Ph.D. in Political Science",
    "Ph.D. in Sociology",
    "Ph.D. in Social Work",
    "Ph.D. in Botany",
    "Ph.D. in Zoology",
    "Ph.D. in Physics",
    "Ph.D. in Chemistry",
    "Ph.D. in Mathematics",
    "Ph.D. in Commerce",
    "Ph.D. in Pharmaceutical Sciences",
    "Ph.D. in Health Technology & Policy",
    "Ph.D. in Medical Laboratory Technology",
    "Ph.D. in Electrical Engineering",
    "Ph.D. in Civil Engineering",
    "Ph.D. in Electronics & Communication Engineering",
    "Ph.D. in Mechanical Engineering",
    "Ph.D. in Computer Science & Engineering",
    "Ph.D. in Psychology",
    "Ph.D. in History",
    "Ph.D. in Education",
    "Ph.D. in Journalism and Mass Communication",
    "Ph.D. in Physiotherapy",
    "Ph.D. in Law",
    "D.Pharm in Pharmacy",
    "B.Tech in Applied Electronics and Instrumentation",
    "B.Tech in Information Technology",
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
        } else if (!/^\d+$/.test(formData.roll_no)) {
            newErrors.roll_no = "Please enter a valid roll number (numbers only)";
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
                        type='text'
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
                        {branches.sort().map((branchOption, index) => (
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