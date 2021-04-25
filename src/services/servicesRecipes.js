const modelsRecipes = require('../models/modelsRecipes');

// rules for insert recipes
const rulesInsRecipes = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw {
      code: 'invalid_data',
      message: 'Invalid entries. Try again.',
    };
    // if (!name || !email || !password || !checkEmail ) {
    //   throw {
    //     code: 'invalid_data',
    //     message: 'Invalid entries. Try again.',
    //   };
  }
  return true;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  // const rules = await rulesInsRecipes(name, ingredients, preparation);
  // if (!rules) {
  //   return false;
  // };
  const recipeInserted = await modelsRecipes.create(name, ingredients, preparation, userId);
  return {
    recipe: recipeInserted,
  };
};

const getAll = async () => {
  const recipes = await modelsRecipes.getAll();
  const recipesList = {
    recipes,
  };
  return recipesList;
};

const getById = async (id) => {
  // id validation on models
  const recipeById = await modelsRecipes.getById(id);
  if (!recipeById) {
    throw {
      code: 'not_found',
      message: 'recipe not found',
    };
  }
  return recipeById;
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  // id validation on models
  const rules = await rulesInsRecipes(name, ingredients, preparation);
  if (!rules) {
    return false;
  };
  await modelsRecipes.updateById(id, name, ingredients, preparation, userId);
  return {
    _id: ObjectId(id),
    name,
    ingredients,
    preparation,
    userId,
  };
};

const excludeById = async (id) => {
  await recipesModel.excludeById(id);
  return true;
};

// const updateImg = async (id) => {};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateById,
  excludeById,
  // updateImg
};
