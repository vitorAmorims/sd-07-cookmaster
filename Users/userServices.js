const userModel = require('./userModels');

const patternResponse = 'Invalid entries. Try again.';

const validateEmail = async (email) => {
  if (!email.includes('@')) return patternResponse;

  const emailExists = await userModel.findEmail(email);
  if (emailExists) return 'Email already registered';

  return undefined;
};

const validateNewUser = async (name, email, password) => {
  if (!name || !password || !email) return patternResponse;

  const isEmail = await validateEmail(email);
  if (isEmail) return isEmail;

  return undefined;
};

module.exports = {
  validateNewUser,
};