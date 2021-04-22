const Joi = require('joi');
const user = require('../Model/user');

const validateUserData = (data) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

const emailAlreadyRegistered = async (email) => user.getByEmail(email);

module.exports = {
  validateUserData,
  emailAlreadyRegistered,
};
