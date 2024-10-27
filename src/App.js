import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./services/UserContext";

// Common Components
import Login from "./components/forms/LoginForm";
import Register from "./components/forms/RegisterForm";
import ResetPassword from "./components/forms/ResetPassword";
import AdminLogin from "./components/common/AdminLogin";
import EditEvent from "./components/common/EditEvent";

// Layout Components
import ForgotPassword from "./components/forms/ForgotPassword";
import RootLayout from "./components/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
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
import { TopAlumni, NotableAlumni } from "./pages/detail/Alumni";
import { Copyright, Disclaimer, TermsOfUse, ContactUs, PrivacyPolicy, AlumniDirectory } from "./pages/detail/Others";
import FeedbackForm from "./pages/detail/Feedbackform";
import FAQ from "./pages/detail/FAQ";
import Contact from "./pages/detail/Contact";
import Scholarship from "./pages/detail/Scholarship";
import Activities from "./pages/detail/Activities";
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
	GoverningCouncil,
	PastPresidents,
	AlumniChapters,
} from "./pages/detail/About";

function App() {
	return (
		<UserProvider>
			<React.Fragment>
				<div className="w-full md:flex">
					<section className="flex flex-1 h-full">
						<Routes>
							<Route element={<RootLayout />}>
								{/* Open Routes */}
								<Route path="/admin-login" element={<AdminLogin />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
								<Route path="/" element={<Home />} />
								<Route path="/overview" element={<Overview />} />
								<Route path="/vision" element={<VisionAndMission />} />
								<Route path="/objectives" element={<Objectives />} />
								<Route path="/council" element={<GoverningCouncil />} />
								<Route path="/presidents" element={<PastPresidents />} />
								<Route path="/chapters" element={<AlumniChapters />} />
								<Route path="/alumnus" element={<Alumnus />} />
								<Route path="/top-alumni" element={<TopAlumni />} />
								<Route path="/notable-alumni" element={<NotableAlumni />} />
								<Route path="/news" element={<NewsList />} />
								<Route path="/news/:id" element={<SingleNews />} />
								<Route path="/gallery" element={<Gallery />} />
								<Route path="/album/:id" element={<SingleAlbum />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/contactus" element={<ContactUs />} />
								<Route path="/feedback" element={<FeedbackForm />} />
								<Route path="/faq" element={<FAQ />} />
								<Route path="/scholarship" element={<Scholarship />} />
								<Route path="/activities" element={<Activities />} />
								<Route path="/events" element={<Events />} />
								<Route path="/events/:id" element={<SingleEvent />} />
								<Route path="/copyright" element={<Copyright />} />
								<Route path="/disclaimer" element={<Disclaimer />} />
								<Route path="/termsofuse" element={<TermsOfUse />} />
								<Route path="/privacypolicy" element={<PrivacyPolicy />} />
								<Route path="/alumnidirectory" element={<AlumniDirectory />} />
								<Route path="/forgot-password" element={<ForgotPassword />} />
								<Route path="/donations" element={<Donations />} />

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
										<ProtectedRoute element={<Profile />} requiredRole="user" />
									}
								/>

								<Route
									path="/profile/:id"
									element={
										<ProtectedRoute element={<Profile />} requiredRole="user" />
									}
								/>
								
								<Route
									path="/change-profile-picture"
									element={
										<ProtectedRoute element={<ChangeProfilePicture />} requiredRole="user" />
									}
								/>

								<Route
									path="/update-profile"
									element={
										<ProtectedRoute
											element={<UpdateProfile />}
											requiredRole="user"
										/>
									}
								/>
							</Route>

							{/*  Admin Routes  */}
							<Route
								element={
									<ProtectedRoute
										element={<AdminLayout />}
										requiredRole="admin"
									/>
								}
							>
								<Route path="/admin-dashboard" element={<AdminDashboard />} />
								<Route path="/alumni-archive" element={<AlumniArchive />} />
								<Route path="/news-form" element={<AdminNewsForm />} />
								<Route path="/events-form" element={<AdminEventsForm />} />
								<Route path="/photo-upload-form" element={<PhotoUpload />} />
								<Route path="/email-form" element={<AdminEmailForm />} />
								<Route path="/add-bulk-alumni" element={<BulkAddAlumni />} />
								<Route path="/edit-event/:id" element={<EditEvent />} />
							</Route>

						</Routes>
					</section>
				</div>
			</React.Fragment>
		</UserProvider>
	);
}

export default App;
