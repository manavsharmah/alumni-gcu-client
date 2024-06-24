import React, { useState, useEffect } from 'react';
import "../pages.css";
import axiosInstance from '../../services/api';


const Admindashboard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchPendingUsers = async () => {
        try {
          const res = await axiosInstance.get('http://localhost:5000/api/auth/pending-users');
          setUsers(res.data);
        } catch (err) {
          console.error(err); // Handle the error appropriately
        }
      };
  
      fetchPendingUsers();
    }, []);
  
    const approveUser = async (email) => {
      try {
        await axiosInstance.post('http://localhost:5000/api/auth/approve', { email });
        setUsers(users.filter(user => user.email !== email));
      } catch (err) {
        console.error(err); // Handle the error appropriately
      }
    };

  return (
        <div className="container mt-5 admin-dashboard">
            <input 
                    type="text" 
                    className="form-control w-25" 
                    placeholder="Search by name or email" 
                    value="username"
                    // onChange={handleSearchChange}
                />
            <div className='admin-header'>
                <h1 className='admin-heading'>ADMIN DASHBOARD</h1>
            </div>
            <h2>Pending User Approvals</h2>
            {/* {users.length > 0 ? ( */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => approveUser(user.email)} className="btn btn-success mr-2">Approve</button>
                                    <button className="btn btn-danger">Reject</button>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            {/* ) : ( */}
                <p>No pending approvals right now.</p>
            {/* )} */}
        </div>
  )
}

export default Admindashboard;