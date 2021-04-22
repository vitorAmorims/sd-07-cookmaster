const recipesModel = require('../models/recipesModels');
const { UNAUTHORIZED, SUCCESS } = require('../controllers/statusCode');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const createRecipes = async (name, ingredients, preparation, user) => {
  const { _id } = user;
  const createdRecipe = await recipesModel.createRecipe(
    name,
    ingredients,
    preparation,
    _id,
  );
  return customAnswer(createdRecipe, SUCCESS);
};

module.exports = {
  createRecipes,
};
