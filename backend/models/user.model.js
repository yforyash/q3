const pool = require('../config/db');

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email, role, is_active FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const findAll = async () => {
  const result = await pool.query(
    'SELECT id, name, email, role, is_active FROM users ORDER BY id ASC'
  );
  return result.rows;
};

const createUser = async (name, email, password, role, extras = {}) => {
  const { phone = null, city = null, state = null, area = null, pincode = null } = extras;
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, is_active, phone, city, state, area, pincode)
     VALUES ($1, $2, $3, $4, true, $5, $6, $7, $8, $9)
     RETURNING id, name, email, role`,
    [name, email, password, role, phone, city, state, area, pincode]
  );
  return result.rows[0];
};

const updateUser = async (id, name, role, is_active) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, role = $2, is_active = $3 WHERE id = $4
     RETURNING id, name, email, role, is_active`,
    [name, role, is_active, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

const updatePassword = async (id, password) => {
  await pool.query('UPDATE users SET password = $1 WHERE id = $2', [password, id]);
};

module.exports = {
  findByEmail,
  findById,
  findAll,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
};