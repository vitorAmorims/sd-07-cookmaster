const { errorMessage, BAD_REQUEST } = require('../config/httpCodes');

const validateRecipes = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const error = errorMessage;
  error.message = 'Invalid entries. Try again.';

  if (
    !name
    || !ingredients
    || !preparation
  ) return res.status(BAD_REQUEST).json(error);
  next();
};

module.exports = validateRecipes;
