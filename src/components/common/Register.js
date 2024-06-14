import React, { useState } from 'react'
import "../components.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const { name, email, phone } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
    }
  };

    return (
        <form onSubmit={onSubmit}>
            <div className='container'>
            <div className='header'>
                <div className='text'>Register</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className="input">
                    <img src='' alt=''/>
                    <input type='text' placeholder='Name'value={name} onChange={onChange} name='name' required/>
                </div>
            </div>
            <br></br>            
            <div className="input">
                <img src='' alt=''/>
                <input type='email' placeholder='Email id' value={email} onChange={onChange} name='email' required/>
            </div>
            <br></br>
            <div className="input">
                <img src='' alt=''/>
                <input type='text' placeholder='Phone' value={phone} onChange={onChange} name='phone' required/>
            </div>
            
            <div className="submit-container">
                <button type='submit'>Signup</button>
            </div>
        </div>
        </form>
        
    );
};

export default Register;

