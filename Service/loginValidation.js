const Joi = require('joi');
const user = require('../Model/user');

const emailAndLoginFilled = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

const validEmailAndPassword = async (email, password) => {
  const data = await user.getByEmail(email);
  if (data === null) return false;
  if (data.password !== password) return false;
  return true;
};

module.exports = {
  emailAndLoginFilled,
  validEmailAndPassword,
};