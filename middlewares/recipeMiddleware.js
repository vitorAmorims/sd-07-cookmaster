const { BAD_REQUEST } = require('../helpers/status');
const { invalidEntries } = require('../helpers/errorMessage');

const recipeMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    res.status(BAD_REQUEST).json(invalidEntries);
  }
  next();
};

module.exports = recipeMiddleware;