import React, { useEffect, useState } from 'react';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../api/location.api';

const LocationManagement = () => {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({ name: '', latitude: '', longitude: '' });
  const [editId, setEditId] = useState(null);

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

  return (
    <div>
      <h2>Location Management</h2>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder='Location Name' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Latitude' value={form.latitude} onChange={e => setForm({ ...form, latitude: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input placeholder='Longitude' value={form.longitude} onChange={e => setForm({ ...form, longitude: e.target.value })} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type='submit' style={{ padding: '8px 20px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editId ? 'Update' : 'Add Location'}
        </button>
        {editId && <button onClick={() => { setEditId(null); setForm({ name: '', latitude: '', longitude: '' }); }} style={{ padding: '8px 20px', background: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>}
      </form>
      <table style={{ width: '100%', background: 'white', borderRadius: '10px', borderCollapse: 'collapse', overflow: 'hidden' }}>
        <thead style={{ background: '#1a1a2e', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Latitude</th>
            <th style={{ padding: '12px' }}>Longitude</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{location.id}</td>
              <td style={{ padding: '12px' }}>{location.name}</td>
              <td style={{ padding: '12px' }}>{location.latitude}</td>
              <td style={{ padding: '12px' }}>{location.longitude}</td>
              <td style={{ padding: '12px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <button onClick={() => handleEdit(location)} style={{ padding: '5px 10px', background: '#1a1a2e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(location.id)} style={{ padding: '5px 10px', background: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationManagement;