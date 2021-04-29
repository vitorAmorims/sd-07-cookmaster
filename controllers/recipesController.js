const recipesService = require('../services/recipesService');

const errorMessage = {
  message: 'Erro interno',
};
const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;
    const newRecipe = await recipesService.createRecipe(name, ingredients, preparation, id);
    const { userId, _id } = newRecipe;
    res.status(201).json({
      recipe: { name, ingredients, preparation, userId, _id },
    });
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipesService.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await recipesService.getRecipeById(id);

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const reqBody = req.body;
    const { id } = req.params;
    const updatedRecipe = await recipesService
      .updateRecipe({ id, reqBody });
      res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await recipesService.deleteRecipe(id);

    res.status(204).json();
  } catch (error) {
    res.status(500).json(errorMessage);
    console.log(error);
  }
};

const addImageRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const image = `${req.hostname}:3000/images/${id}.jpeg`;
    const finalRecipe = await recipesService.addImageRecipe(id, image);
    res.status(200).json(finalRecipe);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao enviar imagem',
    });
    console.log(error);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImageRecipe,
};
