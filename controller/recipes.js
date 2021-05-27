const rec = require('../services/recipes');
const { code } = require('../helpers/messages');

const addRecipes = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipe = await rec.addRecipesService(name, ingredients, preparation);
    return res.status(code[21]).json({ recipe });
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await rec.getAllRecipesService();
    return res.status(code[20]).json(recipes);
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await rec.getByIdService(id);
    return res.status(code[20]).json(recipe);
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

const editRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const editRecipe = await rec.editRecipeService(id, name, ingredients, preparation);
    return res.status(code[20]).json(editRecipe);
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    await rec.deleteRecipeService(id);
    return res.status(code[24]).end();
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

const uploadImage = (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    console.log(req.file);
    const image = `localhost:3000/images/${filename}`;
    const recipe = rec.getByIdService(id);
    const editedRecipe = rec.uploadImageService(id, recipe, image);
    return res.status(code[20]).json(editedRecipe);
  } catch (error) {
    return res.status(error.code || code[50]).json({
      message: error.message,
    });
  }
};

module.exports = { addRecipes, getAllRecipes, getById, editRecipes, deleteRecipe, uploadImage };