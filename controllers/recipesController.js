const recipesModel = require('../models/recipesModel');
const recipesService = require('../services/recipesService');
const { OK, Created, NoContent, BadRequest, NotFound } = require('../config/statusCode');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await recipesService.createRecipe(_id, name, ingredients, preparation);
    const { invalidMessage } = newRecipe;

    if (invalidMessage) return res.status(BadRequest).json({ message: invalidMessage });

    res.status(Created).json({ recipe: newRecipe });
  } catch (err) {
    throw new Error(err);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();

    res.status(OK).json(recipes);
  } catch (err) {
    throw new Error(err);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await recipesService.getRecipeById(id);
    const { notFound } = recipeById;

    if (notFound) return res.status(NotFound).json({ message: notFound });

    res.status(OK).json(recipeById);
  } catch (err) {
    throw new Error(err);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipe = await recipesModel.updateRecipe(id, name, ingredients, preparation);

    res.status(OK).json(updatedRecipe.value);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await recipesService.deleteRecipe(id);
    const { notFound } = deletedRecipe;

    if (notFound) return res.status(NotFound).json({ message: notFound }); 

    res.status(NoContent).send();
  } catch (err) {
    throw new Error(err);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const urlImage = `localhost:3000/images/${id}.jpeg`;
    const newRecipeImage = await recipesModel.updateRecipeImage(id, urlImage);

    res.status(OK).json(newRecipeImage.value);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};