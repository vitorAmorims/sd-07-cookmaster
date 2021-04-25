const Recipes = require('../models/recipesModels');

const recipeUserLoggedOrAdmin = async (req, _res, next) => {
  const { id } = req.params;
  console.log(req.role);
  const { userId, userRole } = req;
  const recipe = Recipes.getRecipeById(id);
  if (!recipe) next({ status: 500, message: 'recipe not found' });
  if (recipe.userId !== userId && userRole !== 'admin') {
    return next({ status: 401, message: 'missing auth token' });
  }
  return next();
};

module.exports = recipeUserLoggedOrAdmin;