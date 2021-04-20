const Joi = require('joi');
const user = require('../Model/user');

const message = {
  invalidEntries: {
    message: 'Invalid entries. Try again.',
  },
  emailRegistered: {
    message: 'Email already registered',
  },
};

const validateUserData = (data) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

const emailAlreadyRegistered = async (email) => user.getByEmail(email);

module.exports = {
  validateUserData,
  message,
  emailAlreadyRegistered,
};
