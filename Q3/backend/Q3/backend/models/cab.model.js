const pool = require('../config/db');

const findAll = async () => {
  const result = await pool.query(`
    SELECT c.id, c.cab_number, c.model, c.is_active, d.id as driver_id, u.name as driver_name
    FROM cabs c
    LEFT JOIN drivers d ON c.driver_id = d.id
    LEFT JOIN users u ON d.user_id = u.id
  `);
  return result.rows;
};

const createCab = async (cab_number, model, driver_id) => {
  const result = await pool.query(
    'INSERT INTO cabs (cab_number, model, driver_id) VALUES ($1, $2, $3) RETURNING *',
    [cab_number, model, driver_id]
  );
  return result.rows[0];
};

const updateCab = async (id, cab_number, model, driver_id, is_active) => {
  const result = await pool.query(
    'UPDATE cabs SET cab_number = $1, model = $2, driver_id = $3, is_active = $4 WHERE id = $5 RETURNING *',
    [cab_number, model, driver_id, is_active, id]
  );
  return result.rows[0];
};

const deleteCab = async (id) => {
  await pool.query('DELETE FROM cabs WHERE id = $1', [id]);
};

module.exports = { findAll, createCab, updateCab, deleteCab };