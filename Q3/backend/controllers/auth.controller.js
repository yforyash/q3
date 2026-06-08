const { loginUser, registerUser, forgotPassword, resetPassword, changePassword } = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    return sendSuccess(res, data, 'Login successful');
  } catch (err) {
    return sendError(res, err.message, 401);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, phone, city, state, area, pincode } = req.body;
    const user = await registerUser(name, email, password, { phone, city, state, area, pincode });
    return sendSuccess(res, user, 'Registration successful', 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await forgotPassword(email);
    return sendSuccess(res, data, 'Reset token generated');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    return sendSuccess(res, null, 'Password reset successful');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changePassword(req.user.id, currentPassword, newPassword);
    return sendSuccess(res, null, 'Password changed successfully');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

module.exports = { login, register, forgotPasswordController, resetPasswordController, changePasswordController };