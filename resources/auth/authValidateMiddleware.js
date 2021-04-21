const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');
const { validateEmail, validateFieldRequired } = require('../../helpers/validations');

const authValidateMiddleware = (req, _res, next) => {
  const { email, password } = req.body;
  try {
    validateFieldRequired(email);
    validateFieldRequired(password);
    validateEmail(email);
    next();
  } catch (error) {
    next(new ErrorHandler(
      StatusCodes.UNAUTHORIZED,
      'All fields must be filled',
    ));
  }
};

module.exports = authValidateMiddleware;
