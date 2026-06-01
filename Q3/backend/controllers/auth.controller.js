const { loginUser } = require('../services/auth.service');
const { sendSuccess, sendError } = require('../utils/response.utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    sendSuccess(res, data, 'Login successful');
  } catch (err) {
    sendError(res, err.message);
  }
};

module.exports = { login };