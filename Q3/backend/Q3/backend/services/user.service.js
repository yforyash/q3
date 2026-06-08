const { findAll, createUser, updateUser, deleteUser } = require('../models/user.model');
const { hashPassword } = require('../utils/hash.utils');

const getUsers = async () => await findAll();

const addUser = async (name, email, password, role) => {
  const hashed = hashPassword(password);
  return await createUser(name, email, hashed, role);
};

const editUser = async (id, name, role, is_active) => await updateUser(id, name, role, is_active);

const removeUser = async (id) => await deleteUser(id);

module.exports = { getUsers, addUser, editUser, removeUser };