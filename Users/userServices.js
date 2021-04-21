const userModel = require('./userModels');

const INVALIDENTRIES = 'Invalid entries. Try again.';

const validateEmail = async (email) => {
  if (!email.includes('@')) return INVALIDENTRIES;

  const emailExists = await userModel.findEmail(email);
  if (emailExists) return 'Email already registered';

  return undefined;
}; // req. 1

const validateNewUser = async (name, email, password) => {
  if (!name || !password || !email) return INVALIDENTRIES;

  const isEmail = await validateEmail(email);
  if (isEmail) return isEmail;

  return undefined;
}; // req. 1

module.exports = {
  validateNewUser,
};