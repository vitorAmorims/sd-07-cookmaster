const { usersModel } = require('../models');

const { readByEmail, readByPassword } = usersModel;
const { UNAUTHORIZED, throwError } = require('../helpers');

const validateEmailOrPasswordIsValid = async (req, _res, next) => {
  try {
    const { email, password } = req.body;
    throwError(!email || !password, 'All fields must be filled', null);
    const userByEmail = await readByEmail(email);
    const userByPassword = await readByPassword(password);
    throwError(!userByEmail || !userByPassword, 'Incorrect username or password', null);
    next();
  } catch (error) {
    console.error(error);
    if (error.code) {
      return next({ status: error.code.status, message: error.code.message });
    }
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
  }
};

module.exports = {
  validateEmailOrPasswordIsValid,
};
