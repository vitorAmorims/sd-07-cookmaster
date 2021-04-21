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
module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipe,
};
