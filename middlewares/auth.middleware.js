const { verifyToken } = require('../utils/jwt.utils');
const { sendError } = require('../utils/response.utils');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return sendError(res, 'Token missing', 401);
    }

    const decoded = verifyToken(token);

    if (!decoded || typeof decoded !== 'object') {
      return sendError(res, 'Invalid or expired token', 401);
    }

    req.user = decoded;
    return next();
  } catch (err) {
    return sendError(res, 'Authentication failed', 401);
  }
};

module.exports = { authenticate };