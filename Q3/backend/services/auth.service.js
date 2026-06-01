const { findByEmail } = require('../models/user.model');
const { comparePassword } = require('../utils/hash.utils');
const { generateToken } = require('../utils/jwt.utils');

const loginUser = async (email, password) => {
  const user = await findByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, role: user.role, email: user.email });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { loginUser };