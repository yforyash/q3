import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/user.api';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';

const ROLES = ['employee', 'driver', 'subadmin', 'admin'];

const parseCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); }
  catch { return null; }
};

const UserManagement = () => {
  const currentUser = parseCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editId, setEditId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, name: '' });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch { setError('Failed to load users.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormLoading(true);
    try {
      if (editId) {
        await updateUser(editId, { name: form.name, role: form.role, is_active: true });
      } else {
        await createUser(form);
      }
      setForm({ name: '', email: '', password: '', role: 'employee' });
      setEditId(null);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    } finally { setFormLoading(false); }
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
    setError('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(deleteModal.id);
      setDeleteModal({ open: false, id: null, name: '' });
      fetchUsers();
    } catch { setError('Delete failed.'); }
  };

  const handleToggleActive = async (user) => {
    try {
      await updateUser(user.id, { name: user.name, role: user.role, is_active: !user.is_active });
      fetchUsers();
    } catch { setError('Update failed.'); }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role', label: 'Role',
      render: (val) => (
        <span className={`status-pill status-role-${val}`}>{val}</span>
      ),
    },
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
          <h2>User Management</h2>
          <p>Manage profiles, roles, and access for all users.</p>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="form-card">
        <div className="card-header">
          <div>
            <h3 style={{ margin: 0, color: '#fff' }}>{editId ? 'Edit User' : 'Create New User'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update name and role.' : 'Add a new member to the system.'}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Name</label>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required={!editId}
              disabled={!!editId}
            />
          </div>
          {!editId && (
            <div className="field-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
              />
            </div>
          )}
          <div className="field-group">
            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {ROLES.filter(r => isAdmin ? true : r !== 'admin').map(r => (
                <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="table-actions">
            <Button type="submit" variant="primary" loading={formLoading}>
              {editId ? 'Update User' : 'Add User'}
            </Button>
            {editId && (
              <Button variant="secondary" onClick={() => {
                setEditId(null);
                setForm({ name: '', email: '', password: '', role: 'employee' });
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
            <h3 style={{ margin: 0, color: '#fff' }}>All Users</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{users.length} total users</p>
          </div>
        </div>
        <Table
          columns={columns}
          data={users}
          loading={loading}
          searchable
          searchPlaceholder="Search by name, email or role..."
          emptyMessage="No users found"
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

export default UserManagement;