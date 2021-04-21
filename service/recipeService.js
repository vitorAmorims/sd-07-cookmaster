const recipeModel = require('../model/recipeModel');

const create = async (id, name, preparation, ingredients) => {
  const recipe = await recipeModel.create(id, name, preparation, ingredients);
  return recipe;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const deleteById = async (id) => {
  await recipeModel.deleteById(id);
};

const editById = async (id, name, preparation, ingredients) => {
  const recipe = await recipeModel.editById(id, name, preparation, ingredients);
  return recipe;
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

module.exports = { create, getAll, getById, editById, deleteById };