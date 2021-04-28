const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const createNewRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  try {
    const recipe = await Services.createNewRecipes(authorization, name, ingredients, preparation);
    res.status(CODES.CREATED).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const sales = await Services.getAllRecipes();
    res.status(CODES.OK).json(sales);
  } catch (error) {
    next(error);
  }
};

const getRecipesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipe = await Services.getRecipesById(id);
    res.status(CODES.OK).json(recipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipesById = async (req, res, next) => {
  const { authorization } = req.headers;
  const recipeObj = { ...req.params, ...req.body };
  // const { id } = req.params;
  // const { name, ingredients, preparation } = req.body;
  try {
    const recipe = await Services
      .updateRecipesById(authorization, recipeObj); // { id, name, ingredients, preparation });
    res.status(CODES.OK).json(recipe);
  } catch (error) {
    next(error);
  }
};

const deleteRecipesById = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  try {
    const recipe = await Services.deleteRecipesById(authorization, id);
    res.status(CODES.NO_CONTENT).json(recipe);
  } catch (error) {
    next(error);
  }
};

const uploadImage = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { path } = req.file;
  try {
    const result = await Services.uploadImage(authorization, id, `localhost:3000/${path}`);
    return res.status(CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
};