const recipesModel = require('../model/recipesModel');

const ERRO = 'Não entrou no service';

const createRecipes = async (name, ingredients, preparation, id) => {
  try {
    return await recipesModel.createRecipes(name, ingredients, preparation, id);
  } catch (error) {
    console.error({ message: ERRO });
  }
};

const getAllRecipes = async () => {
  try {
    return recipesModel.getAllRecipes();
  } catch (error) {
    console.error({ ERRO });
  }
};

const getRecipe = async (id) => {
  try {
    return await recipesModel.getRecipe(id);
  } catch (error) {
    console.error({ ERRO });
  }
};

const updateRecipe = async (id, body) => {
  try {
    return await recipesModel.updateRecipe(id, body);
  } catch (error) {
    console.error({ ERRO });
  }
};

const deleteRecipe = async (id) => {
  try {
    return await recipesModel.deleteRecipe(id);
  } catch (error) {
    console.error({ ERRO });
  }
};

const insertImageRecipe = async (id, image) => {
  try {
    return await recipesModel.insertImageRecipe(id, image);
  } catch (error) {
    console.error({ ERRO });
  }
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  insertImageRecipe,
};
