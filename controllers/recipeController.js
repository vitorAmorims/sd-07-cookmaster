const recipeModel = require('../models/recipeModel');

const message = 'Erro de servidor';

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req;

    const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
    res.status(201).json({ recipe });
  } catch (error) {
    res.status(500).json({ message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await recipeModel.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.getRecipeById(id);
    if (recipe === null) return res.status(404).json({ message: 'recipe not found' });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    
    const { userId } = await recipeModel.getRecipeById(id);

    const editedRecipe = await recipeModel
      .updateRecipe({ id, name, ingredients, preparation, userId });

    res.status(200).json(editedRecipe);
  } catch (error) {
    res.status(500).json({ message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await recipeModel.deleteRecipe(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message });
  }
};

const insertImage = async (req, res) => {
  const { id } = req.params;
  await recipeModel.insertImage(id);
  const recipe = await recipeModel.getRecipeById(id);
  res.status(200).send(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
