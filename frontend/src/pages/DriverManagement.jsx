import React, { useEffect, useState } from 'react';
import { getDrivers, createDriver, updateDriver, deleteDriver } from '../api/driver.api';
import { getUsers } from '../api/user.api';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';

const parseCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const DriverManagement = () => {
  const currentUser = parseCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const [drivers, setDrivers] = useState([]);
  const [driverUsers, setDriverUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ user_id: '', license_number: '', phone: '' });
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await getDrivers();
      setDrivers(res.data || []);
    } catch { setError('Failed to load drivers.'); }
    finally { setLoading(false); }
  };

  const fetchDriverUsers = async () => {
    try {
      const res = await getUsers();
      setDriverUsers((res.data || []).filter(u => u.role === 'driver'));
    } catch {}
  };

  useEffect(() => { fetchDrivers(); fetchDriverUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);
    try {
      if (editId) {
        await updateDriver(editId, {
          license_number: form.license_number,
          phone: form.phone,
          is_available: true,
        });
      } else {
        await createDriver(form);
      }
      setForm({ user_id: '', license_number: '', phone: '' });
      setEditId(null);
      fetchDrivers();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    } finally { setFormLoading(false); }
  };

  const handleEdit = (driver) => {
    setEditId(driver.id);
    setForm({ user_id: driver.user_id, license_number: driver.license_number, phone: driver.phone });
    setError('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDriver(deleteModal.id);
      setDeleteModal({ open: false, id: null, name: '' });
      fetchDrivers();
    } catch { setError('Delete failed.'); }
  };

  const handleToggleAvailable = async (driver) => {
    try {
      await updateDriver(driver.id, {
        license_number: driver.license_number,
        phone: driver.phone,
        is_available: !driver.is_available,
      });
      fetchDrivers();
    } catch { setError('Update failed.'); }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name', render: (val) => val || '—' },
    { key: 'email', label: 'Email', render: (val) => val || '—' },
    { key: 'license_number', label: 'License' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'is_available', label: 'Available',
      render: (val, row) => (
        <span
          className={`status-pill ${val ? 'success' : 'danger'}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggleAvailable(row)}
          title="Click to toggle"
        >
          {val ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'actions', label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          <Button variant="secondary" onClick={() => handleEdit(row)}>Edit</Button>
          {isAdmin && (
            <Button
              variant="danger"
              onClick={() => setDeleteModal({ open: true, id: row.id, name: row.name || `Driver #${row.id}` })}
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
          <h2>Driver Management</h2>
          <p>Track driver assignments, licenses, and availability.</p>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="form-card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>{editId ? 'Edit Driver' : 'Add New Driver'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update license and phone.' : 'Link a driver-role user to fleet operations.'}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Select Driver User</label>
            <select
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
              required={!editId}
              disabled={!!editId}
            >
              <option value="">-- Select User --</option>
              {driverUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>License Number</label>
            <input
              placeholder="e.g. DL1234567890"
              value={form.license_number}
              onChange={(e) => setForm({ ...form, license_number: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Phone</label>
            <input
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="table-actions">
            <Button type="submit" variant="primary" loading={formLoading}>
              {editId ? 'Update Driver' : 'Add Driver'}
            </Button>
            {editId && (
              <Button variant="secondary" onClick={() => {
                setEditId(null);
                setForm({ user_id: '', license_number: '', phone: '' });
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
            <h3 style={{ margin: 0, color: '#fff' }}>Driver Roster</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{drivers.length} total drivers</p>
          </div>
        </div>
        <Table
          columns={columns}
          data={drivers}
          loading={loading}
          searchable
          searchPlaceholder="Search by name, license or phone..."
          emptyMessage="No drivers found"
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

export default DriverManagement;