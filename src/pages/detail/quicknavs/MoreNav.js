import React from 'react'
import { NavLink } from 'react-router-dom'

const MoreNav = () => {
  return (
    <div className="quicknav">
        <div className='nav-cards'>
            <div className='nav-title'>Get Involved</div>
            <hr />
            <ul className='navs'>
                <li><NavLink to="/gallery" activeClassName="active">Gallery</NavLink></li>
                <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default MoreNav