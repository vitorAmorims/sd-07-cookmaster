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

module.exports = {  
  createRecipe,
  findRecipeByName,
  findRecipeById,
  getAllRecipes,
};