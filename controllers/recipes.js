const recipes = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await recipes.createRecipe(name, ingredients, preparation);

  if (newRecipe.err) return res.status(400).json({ message: newRecipe.err });

  return res.status(201).json(newRecipe.data);
};

const getRecipes = async (req, res) => {
  const result = await recipes.getRecipes();

  return res.status(200).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipeById = await recipes.getRecipeById(id);

  if (recipeById.err) return res.status(404).json({ message: recipeById.err });

  return res.status(200).json(recipeById.data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await recipes.updateRecipe(id, name, ingredients, preparation);

  return res.status(200).json(updatedRecipe.data);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const deletedRecipe = await recipes.deleteRecipe(id);

  return res.status(204).json(deletedRecipe.data);
};

const insertImage = async (req, res) => {
  const { id } = req.params;
  const imageUrl = `localhost:3000/images/${id}.jpeg`;

  const insertedImage = await recipes.insertImage(id, imageUrl);

  return res.status(200).json(insertedImage.data);
};

const getImage = async (req, res) => {
  const { id } = req.params;
  const image = await recipes.getImage(id);
  console.log('controller', image);

  return res.status(200).json(image.data);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
  getImage,
};