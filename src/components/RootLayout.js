import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './common/Topbar';
import Bottombar from './common/Bottombar';

const RootLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 ">  
      <Topbar /> // Shows the topbar at the top of the page

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout;
