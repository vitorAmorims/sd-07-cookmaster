const recipesModel = require('../models/recipesModels');
const {
  UNAUTHORIZED,
  SUCCESS,
  OK,
  NOT_FOUND,
  NO_CONTENT,
} = require('../controllers/statusCode');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const notFoundMessage = {
  message: 'recipe not found',
};

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

const getRecipeById = async (id) => {
  const results = await recipesModel.getRecipeById(id);

  if (!results) {
    return customAnswer(notFoundMessage, NOT_FOUND);
  }

  return customAnswer(results, OK);
};

const updateRecipe = async (data, user, id) => {
  const { _id } = user;
  const recipeUpdated = await recipesModel.updateRecipe(data, _id, id);

  return customAnswer(recipeUpdated, OK);
};

const deleteRecipe = async (id) => {
    const results = await recipesModel.excludeRecipe(id);
    if (!results) {
      customAnswer(results, UNAUTHORIZED);
    }
    return customAnswer(results, NO_CONTENT);
};

const uploadImage = async (imgDest, id) => {
  const recipeWithImage = await recipesModel.uploadImage(imgDest, id);
  return customAnswer(recipeWithImage, OK);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
