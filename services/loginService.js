// const joi = require('joi');
const userModel = require('../models/userModel');
const { errorMessages, authTools } = require('../helpers');

/* const validData = (body) => {
  joi.object({
    email: joi.string().email().required(),
    password: joi.required(),
  }).validate(body);
}; */

/* const isValid = (email, password) => {
  if (!email || !password || !validEmailFormat(email)) {
    // return errorMessages.ALL_FIELDS_MUST_BE_FIELD;
    return false;
  }
  return true;
}; */
async function validUserService(email, password) {
  /* if (!isValid(email, password)) return errorMessages.ALL_FIELDS_MUST_BE_FIELD; */

  const user = await userModel.getUserByEmail(email);

  if (!user || user.password !== password) return errorMessages.INCORRECT_USERNAME_OR_PASSWORD;

  return authTools.generateToken({ data: user });
}

module.exports = {
  validUserService,
};
