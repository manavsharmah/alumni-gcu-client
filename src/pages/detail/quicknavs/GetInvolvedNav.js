import React from 'react'
import { NavLink } from 'react-router-dom'

const GetInvolvedNav = () => {
  return (
    <div className="quicknav">
      <div className='nav-cards'>
        <div className='nav-title'>Get Involved</div>
        <hr />
        <ul className='navs'>
          <li><NavLink to="/alumnus" activeClassName="active">Alumnus-Stake Holder Forum</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default GetInvolvedNav