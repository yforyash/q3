import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto', background: '#f5f5f5' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;