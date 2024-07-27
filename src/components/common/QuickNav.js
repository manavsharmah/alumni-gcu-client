import React from 'react';
import { NavLink } from 'react-router-dom';
import "../components.css";

const QuickNav = ({ title, links }) => {
  return (
    <div className="quick-nav">
        <h3 className="quick-nav-title">{title}</h3>
        <hr/>
        <ul className="navs">
            {links.map((link, index) => (
                <li key={index}>
                    <NavLink to={link.to} activeClassName="active">
                        {link.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default QuickNav;
