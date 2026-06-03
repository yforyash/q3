import React from 'react';
import { useNavigate } from 'react-router-dom';

const parseUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const user = parseUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div>
        <h2>Q3 Management</h2>
        <p>Secure fleet and user admin portal</p>
      </div>
      <div className="profile-chip">
        <div>
          <strong>{user?.name || 'Guest'}</strong>
          <span>{user?.role ? user.role.toUpperCase() : 'Not signed in'}</span>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;