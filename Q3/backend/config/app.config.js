module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'q3secret',
  jwtExpiry: '1d',
};