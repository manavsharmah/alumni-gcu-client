import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './components/RootLayout';
import AdminDashboard from './pages/specific/AdminDashboard';
import Login from './components/common/Login';
import Welcome from './pages/specific/Welcome';
import Register from './components/common/Register';
import ResetPassword from './components/common/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from "./components/common/AdminLogin";


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
          />        
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;