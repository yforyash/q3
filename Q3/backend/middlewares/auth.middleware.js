const { verifyToken } = require('../utils/jwt.utils');
const { sendError } = require('../utils/response.utils');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return sendError(res, 'No token provided', 401);

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return sendError(res, 'Invalid token', 401);
  }
};

module.exports = { authenticate };