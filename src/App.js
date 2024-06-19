import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import Header from './components/common/Header';
import Footer from './components/common/Footer'
import Home from './pages/Home';
 second
import RootLayout from './components/RootLayout';
import Admindashboard from './pages/Admindashboard';
import Login from './components/common/Login';
import Welcome from './pages/specific/Welcome';
import Register from './components/common/Register';
import ResetPassword from './components/common/ResetPassword';




import  Login  from "./components/common/Login";
import Register from './components/common/Register';
import ResetPassword from './components/common/ResetPassword';

 main


function App() {
  return (
 second
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
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;
 main
