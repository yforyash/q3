import React, { useEffect, useState } from 'react';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../api/location.api';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';

const parseCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const LocationManagement = () => {
  const currentUser = parseCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await getLocations();
      setLocations(res.data || []);
    } catch { setError('Failed to load locations.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);
    try {
      if (editId) {
        await updateLocation(editId, form);
      } else {
        await createLocation(form);
      }
      setForm({ name: '', latitude: '', longitude: '' });
      setEditId(null);
      fetchLocations();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    } finally { setFormLoading(false); }
  };

  const handleEdit = (loc) => {
    setEditId(loc.id);
    setForm({ name: loc.name, latitude: loc.latitude, longitude: loc.longitude });
    setError('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteLocation(deleteModal.id);
      setDeleteModal({ open: false, id: null, name: '' });
      fetchLocations();
    } catch { setError('Delete failed.'); }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'latitude', label: 'Latitude' },
    { key: 'longitude', label: 'Longitude' },
    {
      key: 'actions', label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          <Button variant="secondary" onClick={() => handleEdit(row)}>Edit</Button>
          {isAdmin && (
            <Button
              variant="danger"
              onClick={() => setDeleteModal({ open: true, id: row.id, name: row.name })}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Location Management</h2>
          <p>Manage pickup and drop-off points using coordinates.</p>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="form-card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>{editId ? 'Edit Location' : 'Add New Location'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update name or coordinates.' : 'Save a new fleet location by lat/lng.'}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Location Name</label>
            <input
              placeholder="e.g. Delhi Airport"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 28.5562"
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              placeholder="e.g. 77.1000"
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: e.target.value })}
              required
            />
          </div>
          <div className="table-actions">
            <Button type="submit" variant="primary" loading={formLoading}>
              {editId ? 'Update Location' : 'Add Location'}
            </Button>
            {editId && (
              <Button variant="secondary" onClick={() => {
                setEditId(null);
                setForm({ name: '', latitude: '', longitude: '' });
                setError('');
              }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>Saved Locations</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{locations.length} total locations</p>
          </div>
        </div>
        <Table
          columns={columns}
          data={locations}
          loading={loading}
          searchable
          searchPlaceholder="Search by name or coordinates..."
          emptyMessage="No locations found"
        />
      </div>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, name: '' })}
        title="Confirm Delete"
        width={400}
      >
        <p style={{ color: 'var(--muted)', marginTop: 0 }}>
          Are you sure you want to delete <strong style={{ color: '#fff' }}>{deleteModal.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="table-actions" style={{ marginTop: 20 }}>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteModal({ open: false, id: null, name: '' })}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationManagement;