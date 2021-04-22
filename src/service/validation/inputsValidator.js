const validator = require('validator');
const { BAD_INPUT, PASS_SETUP } = require('../servDictionary');

const inputsValidator = (body) => {
  const { email, name, password } = body;
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    return { status: BAD_INPUT };
  }
  const strongPass = validator.isStrongPassword(password, PASS_SETUP);
  if (!strongPass) {
    return { status: BAD_INPUT };
  }
  const validName = validator.isAlpha(name.replace(/ /g, ''));
  if (!validName) {
    return { status: BAD_INPUT };
  }
  return { status: 'valid' };
};

module.exports = inputsValidator;