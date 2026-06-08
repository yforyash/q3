import React, { useEffect, useState } from 'react';
import { getDrivers, createDriver, updateDriver, deleteDriver } from '../api/driver.api';

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ user_id: '', license_number: '', phone: '' });
  const [editId, setEditId] = useState(null);

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

  return (
    <div>
      <h2>Driver Management</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder='User ID' value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} required={!editId} disabled={!!editId} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='License Number' value={form.license_number} onChange={e => setForm({ ...form, license_number: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Phone' value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type='submit' style={{ padding: '8px 20px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editId ? 'Update' : 'Add Driver'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ user_id: '', license_number: '', phone: '' }); }} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', background: 'white', borderRadius: '10px', borderCollapse: 'collapse', overflow: 'hidden' }}>
        <thead style={{ background: '#1a1a2e', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>License</th>
            <th style={{ padding: '12px' }}>Phone</th>
            <th style={{ padding: '12px' }}>Available</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{driver.id}</td>
              <td style={{ padding: '12px' }}>{driver.name}</td>
              <td style={{ padding: '12px' }}>{driver.license_number}</td>
              <td style={{ padding: '12px' }}>{driver.phone}</td>
              <td style={{ padding: '12px' }}>{driver.is_available ? 'Yes' : 'No'}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button onClick={() => handleEdit(driver)} style={{ padding: '5px 10px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(driver.id)} style={{ padding: '5px 10px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverManagement;