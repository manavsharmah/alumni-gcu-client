import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./services/UserContext";
import { VisitorCounterProvider } from "./services/VisitorCounterContext";

// Common Components
import Login from "./components/forms/LoginForm";
import Register from "./components/forms/RegisterForm";
import ResetPassword from "./components/forms/ResetPassword";
import AdminLogin from "./components/common/AdminLogin";

// Layout Components
import ForgotPassword from "./components/forms/ForgotPassword";
import RootLayout from "./components/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import AdminLayout from "./pages/admin/AdminLayout";

// Pages
import Home from "./pages/Home";
import FeedHome from "./components/feed/FeedHome";
import Profile from "./pages/specific/Profile";
import UpdateProfile from "./pages/specific/UpdateProfile";
import ChangeProfilePicture from "./pages/specific/ChangeProfilePicture";

// Admin Pages
import AdminNewsForm from "./pages/admin/AdminNewsForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEventsForm from "./pages/admin/AdminEventsForm";
import PhotoUpload from "./pages/admin/PhotoUpload";
import AlumniArchive from "../src/pages/admin/AlumniArchive";
import AdminEmailForm from "./pages/admin/AdminEmailForm";
import BulkAddAlumni from "./pages/admin/AlumniRecordUpload";


// Detail Pages
import { TopAlumni } from "./pages/detail/Alumni";
import { Copyright, Disclaimer, TermsOfUse, ContactUs, PrivacyPolicy, AlumniDirectory } from "./pages/detail/Others";
import FeedbackForm from "./pages/detail/Feedbackform";
import Scholarship from "./pages/detail/Scholarship";
import { Alumnus } from "./pages/detail/GetInvolved";
import Gallery from "./pages/detail/Gallery";
import SingleAlbum from "./pages/detail/SingleAlbum";
import Events from "./pages/detail/Events";
import NewsList from "./pages/detail/NewsArchive";
import SingleNews from "./pages/detail/SingleNews";
import SingleEvent from "./pages/detail/SingleEvent";
import Donations from "./pages/detail/Donations";
import {
	Overview,
	VisionAndMission,
	Objectives,
	GoverningCouncil
} from "./pages/detail/About";
import AdminFeedbackPanel from "./pages/admin/AdminFeedbackPanel";
import DashboardCharts from "./pages/admin/AdminStats";


import AboutAssociation from "./pages/articles/About-Association";
import MissionAndVision from "./pages/articles/MissionAndVision";
import VCMessage from "./pages/articles/VCMessage";

function App() {
  return (
    <UserProvider>
      <VisitorCounterProvider>
      <React.Fragment>
        <div className="w-full md:flex">
          <section className="flex flex-1 h-full">
            <Routes>
              <Route element={<RootLayout />}>
                {/* Public Routes that redirect logged-in users */}
                <Route path="/login" element={<PublicRoute element={<Login />} />} />
                <Route path="/register" element={<PublicRoute element={<Register />} />} />
                <Route path="/forgot-password" element={<PublicRoute element={<ForgotPassword />} />} />
                <Route path="/admin-login" element={<PublicRoute element={<AdminLogin />} />} />

                {/* Open Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/vision" element={<VisionAndMission />} />
                <Route path="/objectives" element={<Objectives />} />
                <Route path="/council" element={<GoverningCouncil />} />
                <Route path="/alumnus" element={<Alumnus />} />
                <Route path="/top-alumni" element={<TopAlumni />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/:id" element={<SingleNews />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/album/:id" element={<SingleAlbum />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<SingleEvent />} />
                <Route path="/copyright" element={<Copyright />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/termsofuse" element={<TermsOfUse />} />
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route path="/donations" element={<Donations />} />

                <Route path="/test" element={<AboutAssociation />} />
                <Route path="/test2" element={<MissionAndVision />} />
                <Route path="/test3" element={<VCMessage />} />

                {/* Admin + User Routes */}
                <Route
                  path="/welcome"
                  element={
                    <ProtectedRoute
                      element={<FeedHome />}
                      requiredRole={["admin", "user"]}
                    />
                  }
                />
                <Route
                  path="/reset-password"
                  element={
                    <ProtectedRoute
                      element={<ResetPassword />}
                      requiredRole={["admin", "user"]}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute element={<Profile />} requiredRole={["admin", "user"]} />
                  }
                />
                <Route
                  path="/profile/:id"
                  element={
                    <ProtectedRoute element={<Profile />} requiredRole={["admin", "user"]} />
                  }
                />
                <Route
                  path="/change-profile-picture"
                  element={
                    <ProtectedRoute element={<ChangeProfilePicture />} requiredRole={["admin", "user"]} />
                  }
                />
                <Route
                  path="/update-profile"
                  element={
                    <ProtectedRoute
                      element={<UpdateProfile />}
                      requiredRole={["admin", "user"]}
                    />
                  }
                />
              </Route>

              {/* Admin Routes */}
              <Route
                element={
                  <ProtectedRoute
                    element={<AdminLayout />}
                    requiredRole="admin"
                  />
                }
              >
                <Route path="/admin-stats" element={<DashboardCharts />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/alumni-archive" element={<AlumniArchive />} />
                <Route path="/news-form" element={<AdminNewsForm />} />
                <Route path="/events-form" element={<AdminEventsForm />} />
                <Route path="/photo-upload-form" element={<PhotoUpload />} />
                <Route path="/email-form" element={<AdminEmailForm />} />
                <Route path="/add-bulk-alumni" element={<BulkAddAlumni />} />
                <Route path="/view-feedback" element={<AdminFeedbackPanel />} />                
              </Route>
            </Routes>
          </section>
        </div>
      </React.Fragment>
      </VisitorCounterProvider>
    </UserProvider>
  );
}

export default App;
