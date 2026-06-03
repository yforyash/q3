import React from 'react';

const parseUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const Dashboard = () => {
  const user = parseUser();

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Welcome back, {user?.name || 'Admin'}</h2>
          <p>Keep an eye on user access, assignments, and fleet activity.</p>
        </div>
      </div>
      <div className="panel-grid">
        <div className="panel-card">
          <h3>Role</h3>
          <p className="value">{user?.role || 'N/A'}</p>
        </div>
        <div className="panel-card">
          <h3>Name</h3>
          <p className="value">{user?.name || 'Unknown'}</p>
        </div>
        <div className="panel-card">
          <h3>Email</h3>
          <p className="value">{user?.email || 'No email'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;