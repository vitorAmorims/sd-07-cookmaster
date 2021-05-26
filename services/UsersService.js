const jwt = require('jsonwebtoken');

const UsersModel = require('../models/UsersModel');
const UsersSchema = require('../schemas/UsersSchema');

const loginErrorMessage = {
  code: 401,
  message: 'Incorrect username or password',
};

const secret = 'serounaosereisaquestao';

const create = async (name, email, password) => {
  const validUserData = UsersSchema.validUserData(name, email, password);
  if (validUserData.message) return validUserData;

  const validEmail = await UsersSchema.validUserEmail(email);
  if (validEmail.message) return validEmail;

  const user = await UsersModel.create(name, email, password);

  return ({ user: { user } });
};

const login = async (email, password) => {
  const validLogin = UsersSchema.validLogin(email, password);
  if (validLogin.message) return validLogin;

  const user = await UsersModel.findByEmail(email);
  if (!user || user.password !== password) return (loginErrorMessage);

  const jwtConfig = {
    expiresIn: 60 * 60 * 5,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user.email }, secret, jwtConfig);

  return ({ token });
};

const createAdmin = async (name, email, password) => {
  const validUserData = UsersSchema.validUserData(name, email, password);
  if (validUserData.message) return validUserData;

  const validEmail = await UsersSchema.validUserEmail(email);
  if (validEmail.message) return validEmail;

  const user = await UsersModel.createAdmin(name, email, password);

  return ({ user: { user } });
};

module.exports = {
  create,
  login,
  createAdmin,
};
