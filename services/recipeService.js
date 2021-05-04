const model = require('../models/recipeModel');

const createRecipe = async (newRecipe) => {
  const { insertedId } = await model.createRecipe(newRecipe);   
  return {
    recipe: {
      _id: insertedId,
      ...newRecipe,      
    },
  };  
};

const findRecipeByName = async (name) => model.findRecipeByName(name);

const findRecipeById = async (id) => model.findRecipeById(id); 
  
const getAllRecipes = async () => model.getAllRecipes();

const updateRecipe = async (id, recipe) => {
  const { insertedId } = await model.findRecipeById(id);
  const recipeUpdate = await model.updateRecipe(id, recipe);
  
  return {
    ...recipeUpdate,
    insertedId,
  };
};

module.exports = {  
  createRecipe,
  findRecipeByName,
  findRecipeById,
  getAllRecipes,
  updateRecipe,
};