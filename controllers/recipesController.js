const { recipesService } = require('../services');
const { STATUS_CODE } = require('../helpers');

const recipesRegistration = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const auth = request.headers.authorization;
    const result = await recipesService.recipesRegistration(auth, name, ingredients, preparation);
    response.status(STATUS_CODE.CREATED).json({ recipe: result });
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getAllRecipes = async (request, response) => {
  try {
    const result = await recipesService.getAllRecipes();
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await recipesService.getRecipe(id);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const updateRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;
    const result = await recipesService.updateRecipe(id, name, ingredients, preparation);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

const deleteRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    await recipesService.deleteRecipe(id);
    response.status(STATUS_CODE.NO_CONTENT).json();
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

module.exports = {
  recipesRegistration,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};