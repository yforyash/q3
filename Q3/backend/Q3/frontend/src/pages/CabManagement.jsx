import React, { useEffect, useState } from 'react';
import { getCabs, createCab, updateCab, deleteCab } from '../api/cab.api';

const CabManagement = () => {
  const [cabs, setCabs] = useState([]);
  const [form, setForm] = useState({ cab_number: '', model: '', driver_id: '' });
  const [editId, setEditId] = useState(null);

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

  return (
    <div>
      <h2>Cab Management</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder='Cab Number' value={form.cab_number} onChange={e => setForm({ ...form, cab_number: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Model' value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Driver ID' value={form.driver_id} onChange={e => setForm({ ...form, driver_id: e.target.value })} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type='submit' style={{ padding: '8px 20px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editId ? 'Update' : 'Add Cab'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ cab_number: '', model: '', driver_id: '' }); }} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', background: 'white', borderRadius: '10px', borderCollapse: 'collapse', overflow: 'hidden' }}>
        <thead style={{ background: '#1a1a2e', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Cab Number</th>
            <th style={{ padding: '12px' }}>Model</th>
            <th style={{ padding: '12px' }}>Driver</th>
            <th style={{ padding: '12px' }}>Active</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cabs.map(cab => (
            <tr key={cab.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{cab.id}</td>
              <td style={{ padding: '12px' }}>{cab.cab_number}</td>
              <td style={{ padding: '12px' }}>{cab.model}</td>
              <td style={{ padding: '12px' }}>{cab.driver_name || 'Unassigned'}</td>
              <td style={{ padding: '12px' }}>{cab.is_active ? 'Yes' : 'No'}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button onClick={() => handleEdit(cab)} style={{ padding: '5px 10px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(cab.id)} style={{ padding: '5px 10px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CabManagement;