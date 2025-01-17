import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Assuming you have a pre-configured Axios instance
import "./admin.css";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [admins, setAdmins] = useState([]); // State to store the list of admins
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch all admins from the API
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the JWT is stored in localStorage
      const headers = { Authorization: `Bearer ${token}` };
      const response = await api.get(`/admin/get-admins`, { headers });
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError("Unable to fetch admin data.");
    }
  };

  useEffect(() => {
    fetchAdmins(); // Fetch admins on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    try {
      const token = localStorage.getItem("token"); // Assuming the JWT is stored in localStorage
      const headers = { Authorization: `Bearer ${token}` };

      const response = await api.post("/admin/create-admin", formData, { headers });

      setStatusMessage(response.data.message); // Success message from backend
      setFormData({ name: "", email: "", password: "" }); // Clear form
      fetchAdmins(); // Refresh admin list after creation
    } catch (err) {
      console.error("Error creating admin:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
        <h1 className='admin-form-header'>Admin Management</h1>
      </div>

      {/* Create Admin Form */}
        <h2>Create Admin</h2>
      <form onSubmit={handleSubmit} className="create-admin-form">
        <div className="admin-form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="admin-form-input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="admin-form-input"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="admin-form-input"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>
        <button type="submit" className="admin-form-button">Create Admin</button>
      </form>

      {statusMessage && <p className="success-message">{statusMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Admin List */}
      <div className="admin-list">
        <h2>Admins</h2>
        <table className="admin-dashboard-table">
            <thead>
                <tr>
                <th>Name</th>
                <th >Email </th>
                </tr>
            </thead>
            <tbody>
                {admins.length > 0 ? (
                admins.map((admin) => (
                    <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="3">No admins found.</td>
                </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAdmin;
