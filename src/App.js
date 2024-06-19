import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './components/RootLayout';
import Admindashboard from './pages/Admindashboard';
import Login from './components/common/Login';
import Welcome from './pages/specific/Welcome';
import Register from './components/common/Register';
import ResetPassword from './components/common/ResetPassword';





function App() {
  return (
    <Router>
        <div>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/admindashboard" element={<Admindashboard />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/welcome' element={<Welcome />} />
            </Route>
          </Routes>
        </div>
    </Router>
  );
}


export default App;

