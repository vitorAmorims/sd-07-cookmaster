const validation = require('../validation');

const recipeMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (validation.validationAttributes(name, ingredients, preparation)) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = recipeMiddleware;
