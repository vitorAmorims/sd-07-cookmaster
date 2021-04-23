const joi = require('joi');
const UserModel = require('../Models/UserModels');
const error = require('../error/index');

async function verify(name, email, password) {
  const validate = joi.object({
    name: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
    password: joi.string().required(),
  });
  const result = validate.validate({ email, name, password });

  if (result.error) throw error.invalidEntries;

  const res = await UserModel.getEmailUser(email);
  if (res !== null) throw error.emailRegistered;
  return UserModel.add(name, email, password);
}

module.exports = {
  verify,
};