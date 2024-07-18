import React from 'react'
import { NavLink } from 'react-router-dom'

const AlumniAchieversNav = () => {
  return (
    <div className="quicknav">
      <div className='nav-cards'>
        <div className='nav-title'>Alumni Achievers</div>
        <hr />
        <ul className='navs'>
          <li><NavLink to="/top-alumni" activeClassName="active">Top Alumni in Lime Light</NavLink></li>
          <li><NavLink to="/notable-alumni" activeClassName="active">Notable Alumni</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default AlumniAchieversNav