import React, { useEffect, useState } from 'react';
import { getCabs, createCab, updateCab, deleteCab } from '../api/cab.api';
import { getDrivers } from '../api/driver.api';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';

const parseCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const CabManagement = () => {
  const currentUser = parseCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const [cabs, setCabs] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ cab_number: '', model: '', driver_id: '' });
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  const fetchCabs = async () => {
    setLoading(true);
    try {
      const res = await getCabs();
      setCabs(res.data || []);
    } catch { setError('Failed to load cabs.'); }
    finally { setLoading(false); }
  };

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(res.data || []);
    } catch {}
  };

  useEffect(() => { fetchCabs(); fetchDrivers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);
    try {
      const payload = {
        cab_number: form.cab_number,
        model: form.model,
        driver_id: form.driver_id || null,
        is_active: true,
      };
      if (editId) {
        await updateCab(editId, payload);
      } else {
        await createCab(payload);
      }
      setForm({ cab_number: '', model: '', driver_id: '' });
      setEditId(null);
      fetchCabs();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    } finally { setFormLoading(false); }
  };

  const handleEdit = (cab) => {
    setEditId(cab.id);
    setForm({ cab_number: cab.cab_number, model: cab.model, driver_id: cab.driver_id || '' });
    setError('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCab(deleteModal.id);
      setDeleteModal({ open: false, id: null, name: '' });
      fetchCabs();
    } catch { setError('Delete failed.'); }
  };

  const handleToggleActive = async (cab) => {
    try {
      await updateCab(cab.id, {
        cab_number: cab.cab_number,
        model: cab.model,
        driver_id: cab.driver_id || null,
        is_active: !cab.is_active,
      });
      fetchCabs();
    } catch { setError('Update failed.'); }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'cab_number', label: 'Cab Number' },
    { key: 'model', label: 'Model' },
    { key: 'driver_name', label: 'Driver', render: (val) => val || 'Unassigned' },
    {
      key: 'is_active', label: 'Status',
      render: (val, row) => (
        <span
          className={`status-pill ${val ? 'success' : 'danger'}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleToggleActive(row)}
          title="Click to toggle"
        >
          {val ? 'Active' : 'Inactive'}
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
              onClick={() => setDeleteModal({ open: true, id: row.id, name: row.cab_number })}
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
          <h2>Cab Management</h2>
          <p>Organize cabs, driver assignments, and fleet availability.</p>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="form-card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>{editId ? 'Edit Cab' : 'Add New Cab'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update cab details.' : 'Register a new cab for fleet operations.'}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Cab Number</label>
            <input
              placeholder="e.g. DL01AB1234"
              value={form.cab_number}
              onChange={(e) => setForm({ ...form, cab_number: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Model</label>
            <input
              placeholder="e.g. Swift Dzire"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Assign Driver</label>
            <select
              value={form.driver_id}
              onChange={(e) => setForm({ ...form, driver_id: e.target.value })}
            >
              <option value="">-- Unassigned --</option>
              {drivers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name || `Driver #${d.id}`} ({d.license_number})
                </option>
              ))}
            </select>
          </div>
          <div className="table-actions">
            <Button type="submit" variant="primary" loading={formLoading}>
              {editId ? 'Update Cab' : 'Add Cab'}
            </Button>
            {editId && (
              <Button variant="secondary" onClick={() => {
                setEditId(null);
                setForm({ cab_number: '', model: '', driver_id: '' });
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
            <h3 style={{ margin: 0, color: '#fff' }}>Cab Inventory</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{cabs.length} total cabs</p>
          </div>
        </div>
        <Table
          columns={columns}
          data={cabs}
          loading={loading}
          searchable
          searchPlaceholder="Search by cab number or model..."
          emptyMessage="No cabs found"
        />
      </div>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, name: '' })}
        title="Confirm Delete"
        width={400}
      >
        <p style={{ color: 'var(--muted)', marginTop: 0 }}>
          Are you sure you want to delete cab <strong style={{ color: '#fff' }}>{deleteModal.name}</strong>?
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

export default CabManagement;