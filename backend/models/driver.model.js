const pool = require('../config/db');

const findAll = async () => {
  const result = await pool.query(`
    SELECT d.id, u.name, u.email, d.license_number, d.phone, d.is_available
    FROM drivers d
    JOIN users u ON d.user_id = u.id
  `);
  return result.rows;
};

const createDriver = async (user_id, license_number, phone) => {
  const result = await pool.query(
    'INSERT INTO drivers (user_id, license_number, phone) VALUES ($1, $2, $3) RETURNING *',
    [user_id, license_number, phone]
  );
  return result.rows[0];
};

const updateDriver = async (id, license_number, phone, is_available) => {
  const result = await pool.query(
    'UPDATE drivers SET license_number = $1, phone = $2, is_available = $3 WHERE id = $4 RETURNING *',
    [license_number, phone, is_available, id]
  );
  return result.rows[0];
};

const deleteDriver = async (id) => {
  await pool.query('DELETE FROM drivers WHERE id = $1', [id]);
};

module.exports = { findAll, createDriver, updateDriver, deleteDriver };