const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const Validations = require('../helpers/validations');
const CustomError = require('../helpers/customError');

const createNewUser = async (name, email, password, role = 'user') => {
  const { error } = Validations.isUserValid({ name, email, password });
  if (error) {
    throw new CustomError(CODES.BAD_REQUEST, error.message);
  }

  try {
    const newUser = await Models.createNewUser(name, email, password, role);
    delete newUser.ops[0].password;
    return { user: newUser.ops[0] };
  } catch (err) {
    throw new CustomError(CODES.CONFLICT, 'Email already registered');
  }
};

module.exports = {
  createNewUser,
};
