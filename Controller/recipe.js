const recipe = require('../Service/recipe');

const create = async (req, res) => {
  try {
    const result = await recipe.create(req.body, req.user);
    res.status(201).json({ recipe: result });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await recipe.getById(id);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipe.updateRecipe(req.body, req.user, id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipe.deleteRecipe(id);
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado.' });
  }
};

module.exports = {
  create,
  getAllRecipes,
  getById,
  updateRecipe,
  deleteRecipe,
};