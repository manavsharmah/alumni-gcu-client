import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Login from './components/forms/LoginForm';
import Register from './components/forms/RegisterForm';
import ResetPassword from './components/forms/ResetPassword';
import AdminLogin from './components/common/AdminLogin';
import Topbar from './components/common/Topbar';
import Bottombar from './components/common/Bottombar';

// Layout Components
import ForgotPassword from './components/forms/ForgotPassword';
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Welcome from './pages/specific/Welcome';
import Profile from './pages/specific/Profile';
import UpdateProfile from './pages/specific/UpdateProfile';

// Admin Pages
import AdminNewsForm from './pages/admin/AdminNewsForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEventsForm from './pages/admin/AdminEventsForm';

// Detail Pages
import { TopAlumni, NotableAlumni } from './pages/detail/Alumni';
import FAQ from './pages/detail/FAQ';
import Contact from './pages/detail/Contact';
import Scholarship from './pages/detail/Scholarship';
import Activities from './pages/detail/Activities';
import { Alumnus } from './pages/detail/GetInvolved';
import Gallery from './pages/detail/Gallery';
import Events from './pages/detail/Events';
import NewsList from './pages/detail/NewsArchive';
import {Overview, VisionAndMission, Objectives, GoverningCouncil, PastPresidents, AlumniChapters } from './pages/detail/About';


function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="w-full md:flex">
        <section className="flex flex-1 h-full">
          <Routes>
            {/* Open Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path='/overview' element={<Overview />} />
            <Route path='/vision' element={<VisionAndMission />} />
            <Route path='/objectives' element={<Objectives />} />
            <Route path='/council' element={<GoverningCouncil />} />
            <Route path='/presidents' element={<PastPresidents />} />
            <Route path='/chapters' element={<AlumniChapters />} />
            <Route path='/alumnus' element={<Alumnus />} />
            <Route path='/top-alumni' element={<TopAlumni />} />
            <Route path='/notable-alumni' element={<NotableAlumni />} />
            {/* <Route path='/news-archive' element={<NewsArchive />} /> */}
            <Route path='/news-archive' element={<NewsList />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/scholarship' element={<Scholarship />} />
            <Route path='/activities' element={<Activities />} />
            <Route path='/events' element={<Events />} />

            {/* Admin + User Routes */}
            <Route
              path="/welcome"
              element={<ProtectedRoute element={<Welcome />} requiredRole={["admin", "user"]} />}
            />
            <Route
              path="/reset-password"
              element={<ProtectedRoute element={<ResetPassword />} requiredRole={["admin", "user"]} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} requiredRole="user" />}
            />
            <Route
              path="/update-profile"
              element={<ProtectedRoute element={<UpdateProfile />} requiredRole="user" />}
            />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute element={<AdminLayout />} requiredRole="admin" />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path='/news-form' element={<AdminNewsForm />} />
              <Route path='/events-form' element={<AdminEventsForm />} />
            </Route>

            {/* forgot password route */}

           <Route path='/forgot-password' element={<ForgotPassword />} />
             
          </Routes>
        </section>
      </div>
      <Bottombar />
    </React.Fragment>
  );
}

export default App;

