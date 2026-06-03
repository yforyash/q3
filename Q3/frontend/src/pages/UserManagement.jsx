import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/user.api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateUser(editId, { name: form.name, role: form.role, is_active: true });
    } else {
      await createUser(form);
    }
    setForm({ name: '', email: '', password: '', role: 'employee' });
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term) ||
      String(user.id).includes(term)
    );
  });

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>User Management</h2>
          <p>Manage profiles, roles, and active users from one place.</p>
        </div>
      </div>
      <div className="form-card">
        <div className="card-header">
          <div>
            <h3>{editId ? 'Edit user' : 'Create new user'}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {editId ? 'Update the selected user.' : 'Add a new employee, driver, subadmin, or admin.'}
            </p>
          </div>
          <input
            className="filter-input"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label>Name</label>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required={!editId}
              disabled={!!editId}
            />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editId}
              type="password"
            />
          </div>
          <div className="field-group">
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="driver">Driver</option>
              <option value="subadmin">Subadmin</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="table-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update user' : 'Add user'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ name: '', email: '', password: '', role: 'employee' });
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
            <h3>Active users</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Showing {filteredUsers.length} of {users.length} users.
            </p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-pill status-role-${user.role || 'employee'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>
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

export default UserManagement;