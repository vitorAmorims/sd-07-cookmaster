const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const validateFieldRequired = (field) => {
  if (field === undefined || field === null) {
    throw new ErrorHandler(
      StatusCodes.BAD_REQUEST,
      'Invalid entries. Try again.',
    );
  }
};

const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email)) {
    throw new ErrorHandler(
      StatusCodes.BAD_REQUEST,
      'Invalid entries. Try again.',
    );
  }
};

const userValidateMiddleware = (req, _res, next) => {
  const { name, email, password } = req.body;
  try {
    validateFieldRequired(name);
    validateFieldRequired(email);
    validateFieldRequired(password);
    validateEmail(email);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userValidateMiddleware;
