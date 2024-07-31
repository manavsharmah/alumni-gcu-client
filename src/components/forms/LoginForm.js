import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import api from '../../services/api';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../services/UserContext';
import './form.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { email, password } = formData;

    const { login } = useUser(); //usercontext

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData); //using login from usercontext
            navigate('/welcome'); 
            window.location.reload();//not a final fix/jugaad
        } catch (err) {
            console.error(err.response.data);
            setError(err.response.data.message || 'Something went wrong');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-container">
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2>Login For Access</h2>
                {error && <p className="error">{error}</p>}
                <div className="input-group">
                    <label htmlFor="email">
                        <FaEnvelope />
                    </label>
                    <input type='email' id="email" name='email' placeholder='Email id' value={email} onChange={onChange} required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">
                        <FaLock />
                    </label>
                    <input type={showPassword ? 'text' : 'password'} id="password" name='password' placeholder='Password' value={password} onChange={onChange} required />
                    <span id="togglePassword" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="forgot-password">
                    <p>Forgot Password? <a href='/forgot-password'>Click Here</a></p>
                </div>
                <div className="register">
                    <p>Not registered? <a href="/register">Register</a></p>
                </div>
                <button type='submit' className='submit-button'>Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
