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
import Overview from './pages/detail/Overview';
import Vision from './pages/detail/Vision';
import Objectives from './pages/detail/Objectives';
import Council from './pages/detail/Council';
import Presidents from './pages/detail/Presidents';
import Chapters from './pages/detail/Chapters';
import Alumnus from './pages/detail/Alumnus';


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
          <Route path='/overview' element={<Overview />} />
          <Route path='/vision' element={<Vision />} />
          <Route path='/objectives' element={<Objectives />} />
          <Route path='/council' element={<Council />} />
          <Route path='/presidents' element={<Presidents />} />
          <Route path='/chapters' element={<Chapters />} />
          <Route path='/alumnus' element={<Alumnus />} />
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
