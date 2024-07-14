import React, { useState } from 'react';
import "./components.css";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/auth/forgot-password', { email });
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
        <div className="container">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className="card">
                        <div className='card-body'>
                            <h2 className='card-title text-center'>Forgot Password</h2>
                            <hr />
                            {message && <div className="alert alert-success">{message}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={onSubmit}>
                                <div className="input">
                                    <input type='email' placeholder='Email id' value={email} onChange={e => setEmail(e.target.value)} name='email' required />
                                </div>
                                <br />
                                <div className="submit-container">
                                    <button type='submit' className='btn btn-primary'>Send</button>
                                    <button type='button' className='btn btn-secondary' onClick={() => navigate('/login')} style={{ marginLeft: '10px' }}>Back</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
