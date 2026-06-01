const pool = require('../config/db');

const findAll = async () => {
  const result = await pool.query('SELECT * FROM locations');
  return result.rows;
};

const createLocation = async (name, latitude, longitude) => {
  const result = await pool.query(
    'INSERT INTO locations (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *',
    [name, latitude, longitude]
  );
  return result.rows[0];
};

const updateLocation = async (id, name, latitude, longitude) => {
  const result = await pool.query(
    'UPDATE locations SET name = $1, latitude = $2, longitude = $3 WHERE id = $4 RETURNING *',
    [name, latitude, longitude, id]
  );
  return result.rows[0];
};

const deleteLocation = async (id) => {
  await pool.query('DELETE FROM locations WHERE id = $1', [id]);
};

module.exports = { findAll, createLocation, updateLocation, deleteLocation };