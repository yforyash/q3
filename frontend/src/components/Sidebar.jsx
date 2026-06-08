import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import permissions from '../utils/rolePermissions';

const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    key: 'users',
    label: 'User Management',
    path: '/users',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    key: 'drivers',
    label: 'Driver Management',
    path: '/drivers',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      </svg>
    ),
  },
  {
    key: 'cabs',
    label: 'Cab Management',
    path: '/cabs',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
        <circle cx="7.5" cy="17.5" r="2.5"/>
        <circle cx="16.5" cy="17.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: 'locations',
    label: 'Location Management',
    path: '/locations',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
];

const parseUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const user = parseUser();
  const role = user?.role || 'employee';
  const allowed = permissions[role] || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const visibleItems = NAV_ITEMS.filter(item => allowed.includes(item.key));

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: 'linear-gradient(135deg,#f97316,#fb923c)',
            borderRadius: 8,
            width: 32,
            height: 32,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 800,
            flexShrink: 0
          }}>Q3</span>
          Admin
        </h1>
        <p style={{ fontSize: '0.8rem' }}>Fleet control center</p>
      </div>

      <nav className="sidebar-nav" style={{ flex: 1 }}>
        {visibleItems.map(item => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(148,163,184,0.12)', paddingTop: 16 }}>
        <div style={{
          padding: '10px 12px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.05)',
          marginBottom: 10
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 2, textTransform: 'capitalize' }}>
            {role}
          </div>
        </div>
        <button
          className="btn btn-secondary"
          style={{ width: '100%', borderRadius: 12, padding: '0.7rem 1rem' }}
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;