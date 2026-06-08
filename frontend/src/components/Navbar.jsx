import React from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your fleet and team' },
  '/users': { title: 'User Management', subtitle: 'Manage roles, access, and profiles' },
  '/drivers': { title: 'Driver Management', subtitle: 'Track assignments and availability' },
  '/cabs': { title: 'Cab Management', subtitle: 'Manage fleet inventory and assignments' },
  '/locations': { title: 'Location Management', subtitle: 'Manage pickup and drop-off points' },
};

const parseUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const RoleBadge = ({ role }) => {
  const colors = {
    admin: { bg: 'rgba(248,113,28,0.14)', color: '#fb923c' },
    subadmin: { bg: 'rgba(34,197,94,0.14)', color: '#4ade80' },
    driver: { bg: 'rgba(96,165,250,0.14)', color: '#60a5fa' },
    employee: { bg: 'rgba(96,165,250,0.14)', color: '#60a5fa' },
  };
  const style = colors[role] || colors.employee;
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'capitalize',
      letterSpacing: '0.03em'
    }}>
      {role}
    </span>
  );
};

const Navbar = () => {
  const location = useLocation();
  const user = parseUser();
  const page = PAGE_TITLES[location.pathname] || { title: 'Q3 Admin', subtitle: '' };

  return (
    <div className="topbar">
      <div>
        <h2 style={{ margin: 0 }}>{page.title}</h2>
        {page.subtitle && (
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{page.subtitle}</p>
        )}
      </div>
      <div className="profile-chip">
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name || 'Guest'}</div>
          <div style={{ marginTop: 4 }}>
            <RoleBadge role={user?.role || 'employee'} />
          </div>
        </div>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#f97316,#fb923c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.95rem',
          color: '#fff',
          flexShrink: 0
        }}>
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </div>
      </div>
    </div>
  );
};

export default Navbar;