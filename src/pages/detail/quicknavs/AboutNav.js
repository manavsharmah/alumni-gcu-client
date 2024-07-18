import React from 'react';
import { NavLink } from 'react-router-dom';
import "./quicknav.css";

const AboutNav = () => {
  return (
    <div className="quicknav">
      <div className='nav-cards'>
        <div className='nav-title'>About</div>
        <hr />
        <ul className='navs'>
          <li><NavLink to="/overview" activeClassName="active">Overview</NavLink></li>
          <li><NavLink to="/vision" activeClassName="active">Vision And Mission</NavLink></li>
          <li><NavLink to="/objectives" activeClassName="active">Objectives And Activities</NavLink></li>
          <li><NavLink to="/council" activeClassName="active">Governing Council</NavLink></li>
          <li><NavLink to="/presidents" activeClassName="active">Past Presidents</NavLink></li>
          <li><NavLink to="/chapters" activeClassName="active">Alumni Chapters</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default AboutNav;
