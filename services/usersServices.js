const emailValidator = require('email-validator');
const usersModel = require('../models/usersModels');
const status = require('../config/statusTable');

const dataRequired = (name, email, password) => {
  if (!name || !email || !emailValidator.validate(email) || !password) {
    return false;
  }
  return true;
};

const emailExists = async (email) => {
  if (await usersModel.findEmail(email) === null) {
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

module.exports = {
  addUserValidation,
};