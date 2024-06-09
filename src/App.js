import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import Home from './pages/Home';
import Header  from "./components/common/Header";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
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
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;