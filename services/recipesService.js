const validateRecipePost = require('./validateRecipePost');

module.exports = (name, ingredients, preparation) => {
  validateRecipePost.nameValidation(name);
  validateRecipePost.ingredientsValidation(ingredients);
  validateRecipePost.preparationValidation(preparation);
};
