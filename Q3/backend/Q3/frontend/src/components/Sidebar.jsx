import React from 'react';
import { NavLink } from 'react-router-dom';
import permissions from '../utils/rolePermissions';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', key: 'dashboard' },
  { name: 'User Management', path: '/users', key: 'users' },
  { name: 'Driver Management', path: '/drivers', key: 'drivers' },
  { name: 'Cab Management', path: '/cabs', key: 'cabs' },
  { name: 'Location Management', path: '/locations', key: 'locations' },
];

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  const allowed = permissions[role] || [];

  return (
    <div style={{ width: '220px', background: '#16213e', color: 'white', height: '100vh', paddingTop: '20px' }}>
      <div style={{ padding: '15px 20px', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #0f3460', marginBottom: '10px' }}>
        Menu
      </div>
      {navItems.filter(item => allowed.includes(item.key)).map(item => (
        <NavLink
          key={item.key}
          to={item.path}
          style={({ isActive }) => ({
            display: 'block',
            padding: '12px 20px',
            color: isActive ? '#e94560' : 'white',
            textDecoration: 'none',
            background: isActive ? '#0f3460' : 'transparent',
            borderLeft: isActive ? '4px solid #e94560' : '4px solid transparent',
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;