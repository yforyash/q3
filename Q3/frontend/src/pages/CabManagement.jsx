import React, { useEffect, useState } from 'react';
import { getCabs, createCab, updateCab, deleteCab } from '../api/cab.api';

const CabManagement = () => {
  const [cabs, setCabs] = useState([]);
  const [form, setForm] = useState({ cab_number: '', model: '', driver_id: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchCabs = async () => {
    const res = await getCabs();
    setCabs(res.data);
  };

  useEffect(() => { fetchCabs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateCab(editId, { ...form, is_active: true });
    } else {
      await createCab(form);
    }
    setForm({ cab_number: '', model: '', driver_id: '' });
    setEditId(null);
    fetchCabs();
  };

  const handleEdit = (cab) => {
    setEditId(cab.id);
    setForm({ cab_number: cab.cab_number, model: cab.model, driver_id: cab.driver_id });
  };

  const handleDelete = async (id) => {
    await deleteCab(id);
    fetchCabs();
  };

  const filteredCabs = cabs.filter((cab) => {
    const term = search.toLowerCase();
    return (
      String(cab.id).includes(term) ||
      cab.cab_number?.toLowerCase().includes(term) ||
      cab.model?.toLowerCase().includes(term) ||
      String(cab.driver_id).includes(term)
    );
  });

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>Cab Management</h2>
          <p>Organize cabs, assignments, and fleet availability.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-header">
          <div>
            <h3>{editId ? 'Edit cab' : 'Add a new cab'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update cab details.' : 'Register a new cab for fleet operations.'}
            </p>
          </div>
          <input
            className="filter-input"
            placeholder="Search cabs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Cab Number</label>
            <input
              placeholder="Cab Number"
              value={form.cab_number}
              onChange={(e) => setForm({ ...form, cab_number: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Model</label>
            <input
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Driver ID</label>
            <input
              placeholder="Driver ID"
              value={form.driver_id}
              onChange={(e) => setForm({ ...form, driver_id: e.target.value })}
            />
          </div>
          <div className="table-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update cab' : 'Add cab'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ cab_number: '', model: '', driver_id: '' });
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
            <h3>Cab inventory</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Showing {filteredCabs.length} of {cabs.length} cabs.
            </p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cab Number</th>
                <th>Model</th>
                <th>Driver</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCabs.map((cab) => (
                <tr key={cab.id}>
                  <td>{cab.id}</td>
                  <td>{cab.cab_number}</td>
                  <td>{cab.model}</td>
                  <td>{cab.driver_name || 'Unassigned'}</td>
                  <td>
                    <span className={`status-pill ${cab.is_active ? 'success' : 'danger'}`}>
                      {cab.is_active ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit(cab)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(cab.id)}>
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

export default CabManagement;