const { sendError } = require('../utils/response.utils');

const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return sendError(res, 'Unauthorized', 401);
      }

      if (!roles.includes(req.user.role)) {
        return sendError(
          res,
          `Access denied. Required roles: ${roles.join(', ')}`,
          403
        );
      }

      next();
    } catch (err) {
      return sendError(res, 'Authorization error', 403);
    }
  };
};

module.exports = { authorize };