require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: '1d',
};