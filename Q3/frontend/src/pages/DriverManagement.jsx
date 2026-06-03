import React, { useEffect, useState } from 'react';
import { getDrivers, createDriver, updateDriver, deleteDriver } from '../api/driver.api';

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ user_id: '', license_number: '', phone: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchDrivers = async () => {
    const res = await getDrivers();
    setDrivers(res.data);
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateDriver(editId, { license_number: form.license_number, phone: form.phone, is_available: true });
    } else {
      await createDriver(form);
    }
    setForm({ user_id: '', license_number: '', phone: '' });
    setEditId(null);
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setEditId(driver.id);
    setForm({ user_id: driver.user_id, license_number: driver.license_number, phone: driver.phone });
  };

  const handleDelete = async (id) => {
    await deleteDriver(id);
    fetchDrivers();
  };

  const filteredDrivers = drivers.filter((driver) => {
    const term = search.toLowerCase();
    return (
      String(driver.id).includes(term) ||
      String(driver.user_id).includes(term) ||
      driver.license_number?.toLowerCase().includes(term) ||
      driver.phone?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Driver Management</h2>
          <p>Track driver assignments, licenses, and availability.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-header">
          <div>
            <h3>{editId ? 'Edit driver' : 'Add a new driver'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update driver records.' : 'Create a driver profile for fleet assignments.'}
            </p>
          </div>
          <input
            className="filter-input"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>User ID</label>
            <input
              placeholder="User ID"
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
              required={!editId}
              disabled={!!editId}
            />
          </div>
          <div className="field-group">
            <label>License Number</label>
            <input
              placeholder="License Number"
              value={form.license_number}
              onChange={(e) => setForm({ ...form, license_number: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Phone</label>
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="table-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update driver' : 'Add driver'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ user_id: '', license_number: '', phone: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <div>
            <h3>Driver roster</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Showing {filteredDrivers.length} of {drivers.length} drivers.
            </p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>License</th>
                <th>Phone</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.id}</td>
                  <td>{driver.user_id}</td>
                  <td>{driver.license_number}</td>
                  <td>{driver.phone}</td>
                  <td>
                    <span className={`status-pill ${driver.is_available ? 'success' : 'danger'}`}>
                      {driver.is_available ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit(driver)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(driver.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;