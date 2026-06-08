const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiry } = require('../config/app.config');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiry });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };