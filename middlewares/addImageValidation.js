const RecipesModel = require('../models/recipesModel');

module.exports = async (req, res, next) => {
  const recipe = await RecipesModel.findRecipeById(req.params.id);
  if (!recipe) {
    const err = new Error('recipe not foun');
    err.statusCode = 401;
    return next(err);
  }
  next();
};