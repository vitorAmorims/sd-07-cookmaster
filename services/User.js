const User = require('../models/User');
const {
  ONLY_ADMINS, ALREADY_REGISTERED, INCORRECT_CREDENTIALS,
} = require('../helpers/errorMessages');
const { createErrorMessage } = require('../helpers/createMessage');
const { validateCreateUser, validateLogin } = require('../helpers/paramsValidations');
const { generateJWT } = require('../helpers/generateJWT');

async function login(email, password) {
  const validationResult = validateLogin(email, password);

  if (validationResult.status === 'error') return validationResult;

  const auth = await User.login(email, password);

  if (!auth) return createErrorMessage(401, INCORRECT_CREDENTIALS);

  try {
    const token = generateJWT(auth);

    return { token };
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

async function createUser(name, email, password) {
  const validationResult = validateCreateUser(name, email, password);

  if (validationResult.status === 'error') return validationResult;

  const alreadyExists = await User.findUserByEmail(email);

  if (alreadyExists) return createErrorMessage(409, ALREADY_REGISTERED);

  try {
    const user = await User.createUser(name, email, password, 'user');
    delete user.password;

    return { user };
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

async function createAdmin(name, email, password, user) {
  const validationResult = validateCreateUser(name, email, password);

  if (validationResult.status === 'error') return validationResult;

  if (user.userRole !== 'admin') return createErrorMessage(403, ONLY_ADMINS);

  const alreadyExists = await User.findUserByEmail(email);

  if (alreadyExists) return createErrorMessage(409, ALREADY_REGISTERED);

  try {
    const admin = await User.createUser(name, email, password, 'admin');
    delete admin.password;

    return { user: admin };
  } catch (error) {
    return createErrorMessage(500, error);
  }
}

module.exports = {
  createUser,
  login,
  createAdmin,
};
