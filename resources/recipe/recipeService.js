const recipeModel = require('./recipeModel');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipeModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const findAll = async () => {
  const allRecipes = await recipeModel.findAll();
  return allRecipes;
};

const findById = async (id) => {
  const foundRecipe = await recipeModel.findById(id);
  return foundRecipe;
};

const update = async ({ id, name, ingredients, preparation, userId, role }) => {
  const foundRecipe = await recipeModel.findById(id);

  if (foundRecipe.userId === userId || role === 'admin') {
    const updatedRecipe = await recipeModel.update(id, name, ingredients, preparation);
    return updatedRecipe;
  }
  
  return null;
};

const updateImage = async (id, imagePath, userId, role) => {
  const foundRecipe = await recipeModel.findById(id);
  if (foundRecipe.userId === userId || role === 'admin') {
    const updatedRecipe = await recipeModel.updateImage(id, imagePath);
    return updatedRecipe;
  }
  
  return null;
};

const del = async (id, userId, role) => {
  const foundRecipe = await recipeModel.findById(id);
  if (foundRecipe.userId === userId || role === 'admin') {
    await recipeModel.del(id);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  del,
  updateImage,
};