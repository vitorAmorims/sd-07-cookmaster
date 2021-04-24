const Users = require('../models/usersModels');
const validateUserService = require('../services/validateUserService');

const validateUser = async (req, _res, next) => {
  const { name, email, password } = req.body;
  const emailCheck = await Users.checkForUserEmail(email);
  if (!await validateUserService(name, email, password)) {
    return next({ status: 400, message: 'Invalid entries. Try again.', code: 'invalid_data' });
  }
  if (emailCheck) {
    return next({ status: 409, message: 'Email already registered', code: 'invalid_data' });
  }
  return next();
};

module.exports = validateUser;