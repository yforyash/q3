const pool = require('../config/db');

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findAll = async () => {
  const result = await pool.query('SELECT id, name, email, role, is_active FROM users');
  return result.rows;
};

const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, password, role]
  );
  return result.rows[0];
};

const updateUser = async (id, name, role, is_active) => {
  const result = await pool.query(
    'UPDATE users SET name = $1, role = $2, is_active = $3 WHERE id = $4 RETURNING id, name, email, role, is_active',
    [name, role, is_active, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = { findByEmail, findAll, createUser, updateUser, deleteUser };