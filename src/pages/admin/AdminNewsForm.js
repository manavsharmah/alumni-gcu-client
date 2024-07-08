import React, { useState } from 'react';
import "../../components/components.css";
import axiosInstance from '../../services/api';

const AdminNewsForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const { title, content } = formData;


  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://localhost:5000/api/news/upload', formData);
      setMessage('Event Uploaded!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Creating News')
    }
  };


  return (
    <div>
      <h2 align ='center'>Create News</h2>
      <form onSubmit={onSubmit}>                           
                            <div className="input">
                                <img src='' alt=''/>
                                <input type='text'  placeholder='Title' value={title} onChange={onChange} name='title' required/>
                            </div>
                        <br></br>            
                        <div align='center'>
                            <img src='' alt=''/>
                            <textarea  placeholder='Content' value={content} onChange={onChange} name='content' required/>
                        </div>
        <button type="submit" className='btn btn-primary'>Create News</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminNewsForm;
