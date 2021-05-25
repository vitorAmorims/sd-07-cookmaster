const UsersModel = require('../models/UsersModel');

const userMessageError = 'Invalid entries. Try again.';
const emailRegisteredError = 'Email already registered';
const loginErrorMessage = 'All fields must be filled';

const validUserData = (name, email, password) => {
  if (!name) return ({ code: 400, message: userMessageError });
  if (!email) return ({ code: 400, message: userMessageError });
  if (!password) return ({ code: 400, message: userMessageError });

  return {};
};

const validUserEmail = async (email) => {
  const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  if (!validEmail.test(email)) return ({ code: 400, message: userMessageError });

  const userAlreadyRegistered = await UsersModel.findByEmail(email);
  if (userAlreadyRegistered) return ({ code: 409, message: emailRegisteredError });

  return {};
};

const validLogin = (email, password) => {
  if (!email) return ({ code: 401, message: loginErrorMessage });
  if (!password) return ({ code: 401, message: loginErrorMessage });

  return {};
};

module.exports = {
  validUserData,
  validUserEmail,
  validLogin,
};
