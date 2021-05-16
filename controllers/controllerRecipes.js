const fs = require('fs');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { ServicesRecipes } = require('../services');
const { status, validUpdateRecipes } = require('../helpers');

const createRecipe = async (req, res, next) => {
  const { body, user: { data: { _id } } } = req;
  try {
    const userId = _id;
    const recipe = { ...body, userId };
    const result = await ServicesRecipes.createNewRecipe(recipe);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const result = await ServicesRecipes.getRecipesList();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const result = await ServicesRecipes.getRecipeById(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updateRecipeById = async (req, res, next) => {
  const { params: { id }, user } = req;
  try {
    const recipeReceivedDb = await ServicesRecipes.getRecipeById(id);
    if (!recipeReceivedDb) throw status.notFound;
    const { _id } = recipeReceivedDb;
    const userId = validUpdateRecipes(recipeReceivedDb, user);
    const result = await ServicesRecipes.updateRecipeById({ _id, ...req.body, userId });
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteRecipeById = async (req, res, next) => {
  const { params: { id }, user } = req;
  try {
    if (!user) throw StatusCodes.UNAUTHORIZED;
    const recipeReceivedDb = await ServicesRecipes.getRecipeById(id);
    if (!recipeReceivedDb) throw status.notFound;
    
    const result = await ServicesRecipes.deleteRecipe(id);
    return res.status(StatusCodes.NO_CONTENT).json(result);
  } catch (error) {
    next(error);
  }
};

const uploadImageInDb = async (req, res, next) => {
  const { filename } = req.file;
  const { id } = req.params;
  try {
    const recipe = await ServicesRecipes.getRecipeById(id);
    const imagePath = `localhost:3000/images/${filename}`;
    recipe.image = imagePath;
    const updatedRecipe = await ServicesRecipes.insertImagedb({ id, imagePath });
    return res.status(StatusCodes.OK).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    next(error);
  }  
};

const getImageRecipe = async (req, res) => {
  try {
    const imageName = req.params.id;
    const image = await fs.createReadStream(path.join(__dirname, `../uploads/${imageName}`));
    return res.status(StatusCodes.OK).sendFile(image.path); 
  } catch (error) {
    console.error(error.message);
    res.status(status.serverError).json({ message: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipeById,
  getRecipes,
  updateRecipeById,
  deleteRecipeById,
  uploadImageInDb,
  getImageRecipe,
};
