const CryptoJS = require('crypto-js');
const pool = require('../config/db');
const { findByEmail, updatePassword, createUser } = require('../models/user.model');
const { comparePassword, hashPassword } = require('../utils/hash.utils');
const { generateToken } = require('../utils/jwt.utils');

// LOGIN
const loginUser = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) throw new Error('User not found');
  if (!user.is_active) throw new Error('Account is disabled');

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// REGISTER (FIXED - HASH ADDED)
const registerUser = async (name, email, password) => {
  const existing = await findByEmail(email);
  if (existing) throw new Error('Email already exists');

  const hashed = hashPassword(password);

  const result = await createUser(name, email, hashed, 'employee');
  return result;
};

// FORGOT PASSWORD
const forgotPassword = async (email) => {
  const user = await findByEmail(email);
  if (!user) throw new Error('User not found');

  const resetToken = CryptoJS.lib.WordArray.random(32).toString();
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  await pool.query(
    `UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3`,
    [resetToken, expiry, user.id]
  );

  return { resetToken, expiresAt: expiry };
};

// RESET PASSWORD
const resetPassword = async (token, newPassword) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()`,
    [token]
  );

  const user = result.rows[0];
  if (!user) throw new Error('Invalid or expired token');

  const hashed = hashPassword(newPassword);

  await updatePassword(user.id, hashed);

  await pool.query(
    `UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = $1`,
    [user.id]
  );

  return true;
};

// CHANGE PASSWORD
const changePassword = async (userId, currentPassword, newPassword) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];

  if (!user) throw new Error('User not found');

  const valid = comparePassword(currentPassword, user.password);
  if (!valid) throw new Error('Current password incorrect');

  const hashed = hashPassword(newPassword);

  await updatePassword(user.id, hashed);

  return true;
};

module.exports = {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  changePassword,
};