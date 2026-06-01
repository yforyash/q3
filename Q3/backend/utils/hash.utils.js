const md5 = require('md5');

const hashPassword = (password) => {
  return md5(password);
};

const comparePassword = (password, hash) => {
  return md5(password) === hash;
};

module.exports = { hashPassword, comparePassword };