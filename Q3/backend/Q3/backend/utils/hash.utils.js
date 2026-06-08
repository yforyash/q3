const CryptoJS = require('crypto-js');

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

const comparePassword = (password, hash) => {
  return CryptoJS.SHA256(password).toString() === hash;
};

module.exports = { hashPassword, comparePassword };
