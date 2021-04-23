const joi = require('joi');
const UserModel = require('../Models/UserModels');

const verifyUser = async (name, email, password) => {
  const validate = joi.object({
    name: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } }).required(),
    password: joi.string().required()
  })

  const result = validate.validate({ email, name, password });

  if(result.error) {
    throw {
      code: 400,
      message: 'Invalid entries. Try again.'
    };
  }

  const res = await UserModel.getEmailUser(email);
  if(res !== null) {

    throw {
      code: 409,
      message: 'Email already registered'
    };
  }

  return await UserModel.add(name, email, password);
}

module.exports = {
  verifyUser,
}