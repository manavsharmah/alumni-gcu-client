import React, { useState } from 'react';
import "../../components/components.css";
import axiosInstance from '../../services/api';

const AdminEventsForm = () => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    organizer: '',
    event_date: '',
    event_time: '',
  })

  const { title, content, organizer, event_date, event_time } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://localhost:5000/api/events/upload', formData);
      setMessage('Event Uploaded!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Error Creating News')
    }
  };

  return (
    <div>
      <h2 align='center'>Create News</h2>
      <br/>
      <br/>
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
                        <br></br>
                        <div className="input">
                            <img src='' alt=''/>
                            <input type='text'  placeholder='Organizer' value={organizer} onChange={onChange} name='organizer'/>
                        </div>
                        <br></br>
                        <div className="input">
                            <img src='' alt=''/>
                            <input type='text'  placeholder='Event Date' value={event_date} onChange={onChange} name='event_date' required/>
                        </div>
                        <br></br>
                        <div className="input">
                            <img src='' alt=''/>
                            <input type='text'  placeholder='Event Time' value={event_time} onChange={onChange} name='event_time'/>
                        </div>
                        <button type="submit" className='btn btn-primary'>Create News</button>
                    </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminEventsForm;