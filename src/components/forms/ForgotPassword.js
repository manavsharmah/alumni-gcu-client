import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './form.css';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await api.post('/user/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            console.error(err.response.data);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Something went wrong');
            } else {
                setError('Something went wrong');
            }
            setMessage('');
        }
    };

    return (
        <div className="form-container">
        <div className="forgot-password-container">
            <form className="forgot-password-form" onSubmit={onSubmit}>
                <h2>Forgot Password</h2>
                <hr />
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="input-group">
                    <label htmlFor="email">
                        <FaEnvelope />
                    </label>
                    <input type='email' name='email' placeholder='Email id' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button type='submit' className='submit-button'>Send</button>
                <div className="register">
                    <p>Go Back To Login</p>
                    <button type='button' className='submit-button btn-secondary' onClick={() => navigate('/login')}>Back</button>
                </div>              
            </form>
        </div>
        </div>
    );
};

export default ForgotPassword;
