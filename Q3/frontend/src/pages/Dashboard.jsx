import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/user.api';
import { getDrivers } from '../api/driver.api';
import { getCabs } from '../api/cab.api';
import { getLocations } from '../api/location.api';

const parseUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const Dashboard = () => {
  const user = parseUser();
  const [stats, setStats] = useState({ users: 0, drivers: 0, cabs: 0, locations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [u, d, c, l] = await Promise.all([
          getUsers(), getDrivers(), getCabs(), getLocations()
        ]);
        setStats({
          users: u.data?.length || 0,
          drivers: d.data?.length || 0,
          cabs: c.data?.length || 0,
          locations: l.data?.length || 0,
        });
      } catch { /* stats stay 0 */ }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Users', value: stats.users, color: '#f97316' },
    { label: 'Total Drivers', value: stats.drivers, color: '#3b82f6' },
    { label: 'Total Cabs', value: stats.cabs, color: '#22c55e' },
    { label: 'Locations', value: stats.locations, color: '#a855f7' },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Welcome back, {user?.name || 'Admin'}</h2>
          <p>Here's an overview of your fleet and team activity.</p>
        </div>
      </div>

      <div className="panel-grid">
        {cards.map((card) => (
          <div className="panel-card" key={card.label}>
            <h3>{card.label}</h3>
            <p className="value" style={{ color: card.color }}>
              {loading ? '...' : card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="panel-grid" style={{ marginTop: '24px' }}>
        <div className="panel-card">
          <h3>Logged In As</h3>
          <p className="value" style={{ fontSize: '1.2rem' }}>{user?.name || 'Unknown'}</p>
        </div>
        <div className="panel-card">
          <h3>Role</h3>
          <p className="value" style={{ fontSize: '1.2rem', textTransform: 'capitalize' }}>
            {user?.role || 'N/A'}
          </p>
        </div>
        <div className="panel-card">
          <h3>Email</h3>
          <p className="value" style={{ fontSize: '1rem', wordBreak: 'break-all' }}>
            {user?.email || 'No email'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;