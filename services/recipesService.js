const recipesModel = require('../models/recipesModel');

// const validateName = (name) => {
//   if (!name) {
//     return false;
//   }
//   return true;
// };

// const validateIngredients = (ingredients) => {
//   if (!ingredients) {
//     return false;
//   }
//   return true;
// };

// const validatePreparation = (preparation) => {
//   if (!preparation) {
//     return false;
//   }
//   return true;
// };

const createRecipes = async (name, ingredients, preparation, userId) => {
  if (!name
    || !ingredients
    || !preparation) {
    return {
      erro: {
        message: 'Invalid entries. Try again.', status: 400,
      },
    };
  }

  const recipes = await recipesModel.createRecipes(name, ingredients, preparation, userId);
  return recipes;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();
  // console.log('recipes no service', recipes);
  return recipes;
};

const getById = async (id) => {
  const result = await recipesModel.getById(id);
  // console.log('service', result);

  if (!result) {
    return {
      msg: {
        message: 'recipe not found',
      },
      status: 404,
    };
  }
  return result;
};

const updateRecipes = async (id, name, ingredients, preparation) => {
  const recipes = await recipesModel.updateRecipes(id, name, ingredients, preparation);
  // if (!recipes) {
  //   return {
  //     msg: {
  //       message: 'missing auth token',
  //       status: 401,
  //     },
  //   };
  // }
  console.log('recipe', recipes);

  return recipes;
};

const deleteRecipe = async (id) => {
  const recipes = await recipesModel.getById(id);

  // if (!recipes) {
  //   return {
  //     msg: {
  //       message: 'missing auth token',
  //     },
  //     status: 401,
  //   };
  // }
  return recipes;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getById,
  updateRecipes,
  deleteRecipe,
};
