const { recipesService } = require('../service');
const { httpStatusCode } = require('../../constants');

const creatRecipe = async (req, res, next) => {
  const recipe = req.body;
  recipe.userId = req.user;
  try {
    const creadtedRecipe = await recipesService.creatRecipe(recipe);
    return res.status(httpStatusCode.CREATED).json({ recipe: creadtedRecipe });
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.BAD_REQUEST,
    });
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipesListed = await recipesService.getAllRecipes();
    return res.status(httpStatusCode.OK).json(recipesListed);
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.BAD_REQUEST,
    });
  }
};

const getRecipesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipeFound = await recipesService.getRecipesById(id);
    return res.status(httpStatusCode.OK).json(recipeFound);
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.NOT_FOUND,
    });
  }
};

const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipe = req.body;
  const { name, ingredients, preparation } = recipe;
  let editedRecipe = { name, ingredients, preparation, recipeId: id, userId: req.user };
  try {
    editedRecipe = await recipesService.editRecipe(editedRecipe);
    return res.status(httpStatusCode.OK).json(editedRecipe);
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.NOT_FOUND,
    });
  }
};

const deletRecipe = async (req, res, next) => {
  const { id } = req.params;
  try {
    await recipesService.deletRecipe(id);
    return res.status(httpStatusCode.NO_CONTENT).send();
  } catch (error) {
    return next({
      message: error.message,
      status: httpStatusCode.NOT_FOUND,
    });
  }
};

module.exports = {
  editRecipe,
  deletRecipe,
  creatRecipe,
  getAllRecipes,
  getRecipesById,
};
