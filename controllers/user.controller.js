const { getUsers, addUser, editUser, removeUser } = require('../services/user.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    sendSuccess(res, users);
  } catch (err) {
    sendError(res, err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await addUser(name, email, password, role);
    sendSuccess(res, user, 'User created', 201);
  } catch (err) {
    sendError(res, err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, role, is_active } = req.body;
    const user = await editUser(req.params.id, name, role, is_active);
    sendSuccess(res, user, 'User updated');
  } catch (err) {
    sendError(res, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await removeUser(req.params.id);
    sendSuccess(res, null, 'User deleted');
  } catch (err) {
    sendError(res, err.message);
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };