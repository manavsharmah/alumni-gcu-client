import React, { useState } from 'react'
import "./components.css";
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
        <div className="container" >
            <div className='row justify-content-center'>
            <div className='col-md-6'>
                <div class="card">
                    <div className='card-body'>
                    <h2 className='card-title text-center'>Registration</h2>
                    <hr />
                        <form onSubmit={onSubmit}>                           
                                <div className="input">
                                    <img src='' alt=''/>
                                    <input type='text'  placeholder='Name'value={name} onChange={onChange} name='name' required/>
                                </div>
                            <br></br>            
                            <div className="input">
                                <img src='' alt=''/>
                                <input type='email'  placeholder='Email id' value={email} onChange={onChange} name='email' required/>
                            </div>
                            <br></br>
                            <div className="input">
                                <img src='' alt=''/>
                                <input type='text'  placeholder='Phone' value={phone} onChange={onChange} name='phone' required/>
                            </div>
                            <div className="already-registered">Already Registered? <span>Login!</span></div>
                            {/* <br /> */}
                            
                            <div className="submit-container">
                                <button type='submit' className='btn btn-primary'>Register</button>
                            </div>
                        </form>
                </div>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Register;