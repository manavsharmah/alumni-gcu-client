import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import Home from './pages/Home';
import Welcome from './pages/specific/Welcome';
import Header  from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from './components/common/login.js';
import Signup from './components/common/Signup';


function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/welcome' element={<Welcome />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;