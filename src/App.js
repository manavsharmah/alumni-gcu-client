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
import TopAlumni from './pages/detail/TopAlumni';
import NotableAlumni from './pages/detail/NotableAlumni';
import NewsArchive from './pages/detail/NewsArchive';
import FAQ from './pages/detail/FAQ';
import Contact from './pages/detail/Contact';
import Scholarship from './pages/detail/Scholarship';
import Activities from './pages/detail/Activities';
import Alumnus from './pages/detail/Alumnus';
import Chapters from './pages/detail/Chapters';
import Presidents from './pages/detail/Presidents';
import Council from './pages/detail/Council';
import Objectives from './pages/detail/Objectives';
import Vision from './pages/detail/Vision';
import Overview from './pages/detail/Overview';
import Gallery from './pages/detail/Gallery';


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
            <Route path='/top-alumni' element={<TopAlumni />} />
            <Route path='/alumnus' element={<Alumnus />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/vision' element={<Vision />} />
            <Route path='/objectives' element={<Objectives />} />
            <Route path='/council' element={<Council />} />
            <Route path='/presidents' element={<Presidents />} />
            <Route path='/chapters' element={<Chapters />} />
            <Route path='/notable-alumni' element={<NotableAlumni />} />
            <Route path='/news-archive' element={<NewsArchive />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/scholarship' element={<Scholarship />} />
            <Route path='/activities' element={<Activities />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;