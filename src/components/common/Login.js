import React, { useState } from 'react'
import "../components.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  
    const { email, password } = formData;
  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const onSubmit = async e => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        console.log(res.data);
        navigate('/reset-password'); // Navigate to reset password page after successful login
      } catch (err) {
        console.error(err.response.data);
      }
    };

    return (
        <form onSubmit={onSubmit}>
        <div className='container'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <br></br>
            
            <div className="input">
                <img src='' alt=''/>
                <input type='email' placeholder='Email id' value={email} onChange={onChange} name='email' required/>
            </div>
            <br></br>
            <div className="input">
                <img src='' alt=''/>
                <input type='password' placeholder='Password' value={password} onChange={onChange} name='password' required/>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            
            <div className="submit-container">
                <button type="submit">Login</button>
            </div>
        </div>
        </form>
        
    );
};

export default Login;