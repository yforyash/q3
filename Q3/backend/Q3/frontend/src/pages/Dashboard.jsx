import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h3>Role</h3>
          <p style={{ fontSize: '24px', color: '#e94560', textTransform: 'capitalize' }}>{user?.role}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h3>Name</h3>
          <p style={{ fontSize: '24px', color: '#1a1a2e' }}>{user?.name}</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h3>Email</h3>
          <p style={{ fontSize: '24px', color: '#1a1a2e' }}>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;