const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('../helpers/validations');
const CustomError = require('../helpers/customError');
const Auth = require('../helpers/authValidations');

const login = async (email, password) => {
  const { error } = Validations.isLoginValid({ email, password });
  if (error) {
    throw new CustomError(CODES.UNAUTHORIZED, error.message);
  }

  try {
    const userData = await Models.getByEmailAndPassword(email, password);
    if (userData) return { token: Auth.generateToken(userData) };
    throw new Error();
  } catch (err) {
    throw new CustomError(CODES.UNAUTHORIZED, 'Incorrect username or password');
  }
};

module.exports = {
  login,
};
