const recipesModel = require('../models/recipesModels');
const { UNAUTHORIZED, SUCCESS, OK } = require('../controllers/statusCode');

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

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return customAnswer(allRecipes, OK);
};

module.exports = {
  createRecipes,
  getAllRecipes,
};
