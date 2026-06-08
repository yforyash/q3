const { findAll, createUser, updateUser, deleteUser, findByEmail } = require('../models/user.model');
const { hashPassword } = require('../utils/hash.utils');

const getUsers = async () => {
  return await findAll();
};

const addUser = async (name, email, password, role) => {
  const exists = await findByEmail(email);
  if (exists) throw new Error('Email already registered');
  const hashedPassword = hashPassword(password);
  return await createUser(name, email, hashedPassword, role || 'employee');
};

const editUser = async (id, name, role, is_active) => {
  return await updateUser(id, name, role, is_active);
};

const removeUser = async (id) => {
  return await deleteUser(id);
};

module.exports = { getUsers, addUser, editUser, removeUser };