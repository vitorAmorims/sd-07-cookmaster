const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');
const { validateEmail, validateFieldRequired } = require('../../helpers/validations');

const userValidateMiddleware = (req, _res, next) => {
  const { name, email, password } = req.body;
  try {
    validateFieldRequired(name);
    validateFieldRequired(email);
    validateFieldRequired(password);
    validateEmail(email);
    next();
  } catch (error) {
    next(new ErrorHandler(
      StatusCodes.BAD_REQUEST,
      'Invalid entries. Try again.',
    ));
  }
};

module.exports = userValidateMiddleware;
