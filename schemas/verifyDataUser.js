const userModel = require('../models/userModel');

const message = {
  invalid: 'Invalid entries. Try again.',
  emailRepeated: 'Email already registered',
};

const codeHTTP = {
  badRequest: 400,
  conflict: 409,
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const verifyEmailRepeated = async (email) => {
  const users = await userModel.getAllUsers();
  const isRepeated = users.some((user) => user.email === email);
  if (isRepeated) return { code: codeHTTP.conflict, message: message.emailRepeated };
  return {};
};

const verifyDataUsers = (name, email, password) => {
  switch (true) {
    case (!name || !email || !password):
      return { code: codeHTTP.badRequest, message: message.invalid };
    case (!validateEmail(email)):
      return { code: codeHTTP.badRequest, message: message.invalid };
    default: return {};
  }
};

module.exports = { verifyDataUsers, verifyEmailRepeated };
