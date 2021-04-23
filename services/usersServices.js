const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const usersModel = require('../models/usersModels');
const status = require('../config/statusTable');
const secret = require('../config/secret');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const emailNull = (email) => {
  if (!email) {
    return true;
  }
  return false;
};

const passwordNull = (password) => {
  if (!password) {
    return true;
  }
  return false;
};

const dataRequired = (name, email, password) => {
  if (!name || !email || !emailValidator.validate(email) || !password) {
    return false;
  }
  return true;
};

const emailExists = async (email) => {
  if (await usersModel.getUser(email) === null) {
    return false;
  }
  return true;
};

const addUserValidation = async (name, email, password, role) => {
  if (!dataRequired(name, email, password)) {
    return {
      message: 'Invalid entries. Try again.',
      code: status.badRequest,
    };
  }

  if (await emailExists(email)) {
    return {
      message: 'Email already registered',
      code: status.conflict,
    };
  }

  const newUser = await usersModel.add(name, email, password, role);
  return newUser;
};

const newToken = async (mail, password) => {
  if (emailNull(mail) || passwordNull(password)) {
    return { message: 'All fields must be filled', code: status.unauthorized };
  }
  
  const user = await usersModel.getUser(mail);
  if (user && user.password === password) {
    const id = user[Object.keys(user)[0]];
    const { email, role } = user;
    const token = jwt.sign({ data: { id, email, role } }, secret, jwtConfig);
    return token;
  }
  return {
    message: 'Incorrect username or password',
    code: status.unauthorized,
  };
};

const addAdminValidation = async (name, email, password, role) => {
  if (role === 'admin') {
    const userAdmin = await usersModel.add(name, email, password, role);
    return userAdmin;
  }

  return { message: 'Only admins can register new admins', code: status.forbidden };
};

module.exports = {
  addUserValidation,
  newToken,
  addAdminValidation,
};