import React from 'react';
import "./pages.css";


const Admindashboard = () => {
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
            <h2>Pending Approvals</h2>
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
                        {/* {users.map(user => ( */}
                            <tr>
                                <td>username</td>
                                <td>user email</td>
                                <td>
                                    <button className="btn btn-success mr-2">Approve</button>
                                    <button className="btn btn-danger">Reject</button>
                                </td>
                            </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            {/* ) : ( */}
                <p>No pending approvals right now.</p>
            {/* )} */}
        </div>
  )
}

export default Admindashboard;