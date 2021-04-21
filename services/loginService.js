const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModels');
const loginSchema = require('../schemas/loginSchema');

const OK = 200;
const secret = 'senha';

const sendToken = async (email, password) => {
  const validationLogin = await loginSchema.validateLogin(email, password);

  if (validationLogin.message) return validationLogin;

  const login = await userModel.getUserByEmail(email);

  const jwtConfig = {
    expiresIn: 60 * 10,
    algorithm: 'HS256',
  };

const token = jwt.sign({ data: {
  email: login.email, id: login.id, role: login.role },
}, secret, jwtConfig);

  return { code: OK, token };
};

module.exports = {
  sendToken,
};