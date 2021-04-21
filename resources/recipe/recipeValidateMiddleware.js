const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');
const { validateFieldRequired } = require('../../helpers/validations');

const recipeValidateMiddleware = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    validateFieldRequired(name);
    validateFieldRequired(ingredients);
    validateFieldRequired(preparation);
    next();
  } catch (error) {
    next(new ErrorHandler(
      StatusCodes.BAD_REQUEST,
      'Invalid entries. Try again.',
    ));
  }
};

module.exports = recipeValidateMiddleware;
