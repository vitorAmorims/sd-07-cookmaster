const validateRecipe = require('./validateRecipes');

const recipePostService = (name, ingredients, preparation) => {
  validateRecipe.nameValidation(name);
  validateRecipe.ingredientsValidation(ingredients);
  validateRecipe.preparationValidation(preparation);
};

const recipesListService = (recipe) => {
  validateRecipe.recipeValidation(recipe);
};

module.exports = {
  recipePostService,
  recipesListService,
};