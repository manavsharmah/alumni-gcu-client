import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './common/Topbar';
import Bottombar from './common/Bottombar';

const RootLayout = ({ hideBottomBar }) => {
  return (
    <div className="d-flex flex-column min-vh-100 ">  
      <Topbar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      {!hideBottomBar && <Bottombar />}
    </div>
  )
}

export default RootLayout;
