const {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require('../services/auth.service');

const { sendSuccess, sendError } = require('../utils/response.utils');

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    return sendSuccess(res, data, 'Login successful');
  } catch (err) {
    return sendError(res, err.message, 401);
  }
};

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    return sendSuccess(res, user, 'Registration successful', 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

// FORGOT PASSWORD
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await forgotPassword(email);

    return sendSuccess(res, data, 'Reset token generated');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    await resetPassword(token, newPassword);

    return sendSuccess(res, null, 'Password reset successful');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

// CHANGE PASSWORD
const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(req.user.id, currentPassword, newPassword);

    return sendSuccess(res, null, 'Password changed successfully');
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

module.exports = {
  login,
  register,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
};  