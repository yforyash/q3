const { sendError } = require('../utils/response.utils');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, 'Access denied', 403);
    }
    next();
  };
};

module.exports = { authorize };