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

const findRecipeByName = async (name) => {
  const recipe = await model.findRecipeByName(name);
  return recipe;
};

const getAllRecipes = async () => model.getAllRecipes();

module.exports = {  
  createRecipe,
  findRecipeByName,
  getAllRecipes,
};