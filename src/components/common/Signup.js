import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import "../components.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
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
        const res = await axios.post('http://localhost:5000/api/signup', {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }) 
        .catch((err) => console.log(err));
        const data = await res.data;
        //console.log(data)
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/login")); //Later we need to route the user to home page
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
            <div className='header'>
                <div className='text'>Signup</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className="input">
                    <img src='' alt=''/>
                    <input type='text' placeholder='Name'value={inputs.name} onChange={handleChange} name='name'/>
                </div>
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
            
            <div className="submit-container">
                <Button type='submit'>Signup</Button>
            </div>
        </div>
        </form>
        
    );
};

export default Signup;

