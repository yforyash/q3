import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/user.api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [editId, setEditId] = useState(null);

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

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required={!editId} disabled={!!editId} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required={!editId} type='password' style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value='employee'>Employee</option>
          <option value='driver'>Driver</option>
          <option value='subadmin'>Subadmin</option>
          <option value='admin'>Admin</option>
        </select>
        <button type='submit' style={{ padding: '8px 20px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editId ? 'Update' : 'Add User'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ name: '', email: '', password: '', role: 'employee' }); }} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', background: 'white', borderRadius: '10px', borderCollapse: 'collapse', overflow: 'hidden' }}>
        <thead style={{ background: '#1a1a2e', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{user.id}</td>
              <td style={{ padding: '12px' }}>{user.name}</td>
              <td style={{ padding: '12px' }}>{user.email}</td>
              <td style={{ padding: '12px', textTransform: 'capitalize' }}>{user.role}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button onClick={() => handleEdit(user)} style={{ padding: '5px 10px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={{ padding: '5px 10px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;