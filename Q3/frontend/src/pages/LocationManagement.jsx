import React, { useEffect, useState } from 'react';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../api/location.api';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchLocations = async () => {
    const res = await getLocations();
    setLocations(res.data);
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateLocation(editId, form);
    } else {
      await createLocation(form);
    }
    setForm({ name: '', latitude: '', longitude: '' });
    setEditId(null);
    fetchLocations();
  };

  const handleEdit = (location) => {
    setEditId(location.id);
    setForm({ name: location.name, latitude: location.latitude, longitude: location.longitude });
  };

  const handleDelete = async (id) => {
    await deleteLocation(id);
    fetchLocations();
  };

  const filteredLocations = locations.filter((location) => {
    const term = search.toLowerCase();
    return (
      String(location.id).includes(term) ||
      location.name?.toLowerCase().includes(term) ||
      String(location.latitude).includes(term) ||
      String(location.longitude).includes(term)
    );
  });

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Location Management</h2>
          <p>Manage pickup and drop-off points across the fleet.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-header">
          <div>
            <h3>{editId ? 'Edit location' : 'Add a new location'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update location coordinates.' : 'Save a new fleet location.'}
            </p>
          </div>
          <input
            className="filter-input"
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Location Name</label>
            <input
              placeholder="Location Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Latitude</label>
            <input
              placeholder="Latitude"
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Longitude</label>
            <input
              placeholder="Longitude"
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              required
            />
          </div>
          <div className="table-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update location' : 'Add location'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ name: '', latitude: '', longitude: '' });
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
            <h3>Saved locations</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Showing {filteredLocations.length} of {locations.length} locations.
            </p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((location) => (
                <tr key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.name}</td>
                  <td>{location.latitude}</td>
                  <td>{location.longitude}</td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit(location)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(location.id)}>
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

export default LocationManagement;