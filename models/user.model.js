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

const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, is_active)
     VALUES ($1, $2, $3, $4, true)
     RETURNING id, name, email, role`,
    [name, email, password, role]
  );

  return result.rows[0];
};

const updatePassword = async (id, password) => {
  await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2',
    [password, id]
  );
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  updatePassword,
};