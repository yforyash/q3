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

const parseUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const Sidebar = () => {
  const user = parseUser();
  const role = user?.role;
  const allowed = permissions[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>Q3 Admin</h1>
        <p>Fleet control center</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.filter(item => allowed.includes(item.key)).map(item => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;