const JWT = require('jsonwebtoken');
const userModel = require('../model/users');

const SECRET = 'cookmaster';
const JWT_CONFIG = {
  expiresIn: 60 * 20,
  algorithm: 'HS256',
};

const register = (user) => userModel.register(user);

const findByEmail = (email) => userModel.findByEmail(email);

const login = async (userEmail, password) => {
  const user = await userModel.findByEmail(userEmail);
  if (!user || user.password !== password) {
    return undefined;
  }
  const { name, email, role } = user;
  const token = JWT.sign({ name, email, role }, SECRET, JWT_CONFIG);
  return { token };
};

module.exports = {
  register,
  findByEmail,
  login,
};