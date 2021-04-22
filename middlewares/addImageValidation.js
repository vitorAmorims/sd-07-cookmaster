const RecipesModel = require('../models/recipesModel');

module.exports = async (req, res, next) => {
  const recipe = await RecipesModel.findRecipeById(req.params.id);
  if (!recipe) {
    return res.status(401).json({ message: 'recipe not found' });
  }
  next();
};