import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import Header from './components/common/Header';
import Footer from './components/common/Footer'
import Home from './pages/Home';
import  Login  from "./components/common/Login";
import Register from './components/common/Register';
import ResetPassword from './components/common/ResetPassword';



function App() {
  return (
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
