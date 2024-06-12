import React, { useState } from 'react'
import "../components.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const Login = () => {
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ 
            ...prev, 
            [e.target.name]: e.target.value
        }));
    };
    
    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/login", {
            email: inputs.email,
            password: inputs.password
        })
        .catch((err) => console.log(err));
        const data = await res.data;
        // console.log(data)
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/welcome"));
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className='container'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <br></br>
            
            <div className="input">
                <img src='' alt=''/>
                <input type='email' placeholder='Email id' value={inputs.email} onChange={handleChange} name='email'/>
            </div>
            <br></br>
            <div className="input">
                <img src='' alt=''/>
                <input type='password' placeholder='Password' value={inputs.password} onChange={handleChange} name='password'/>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
            
            <div className="submit-container">
                <Button type='submit'>Login</Button>
            </div>
        </div>
        </form>
        
    );
};

export default Login;