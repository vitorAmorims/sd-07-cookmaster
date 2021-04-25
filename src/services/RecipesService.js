const recipesModel = require('../models/RecipesModel');

const create = async ({ name, ingredients, preparation }, userId) => { 
  const insertedId = await recipesModel.create({ name, ingredients, preparation, userId });
  return { name, ingredients, preparation, userId, _id: insertedId };
};

const getAll = async () => {
  const recipes = await recipesModel.findAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModel.findById(id);
  if (recipe) return recipe;
  throw new Error('recipe not found');
};

/* const checkUserLogin = async ({ email, password }) => {
  const userExists = await userModel.findByEmail(email);
  if (userExists && userExists.password === password) {
    return userExists;
  }
  throw new Error('Senha ou Email inválidos');
}; */

module.exports = {
  create,
  getAll,
  getById,
};