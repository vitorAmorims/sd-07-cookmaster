const { recipesModel } = require('../models');

const {
  validEntries,
  existID,
} = require('../validations/recipesValidation');

const add = async (name, ingredients, preparation, userId) => {
  await validEntries(name, ingredients, preparation);

  const user = await recipesModel.add(name, ingredients, preparation, userId);
  delete user.password; // código @rafaelmguimaraes
  return user;
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getByID = async (id) => {
  const recipe = await existID(id);
  return recipe;
};

const update = async (id, body, user) => {
  const { name, ingredients, preparation } = body;
  const { _id } = user;
  await validEntries(name, ingredients, preparation);
  await existID(id);
  const updatedRecipe = await recipesModel.updateByID(id, body, _id);

  return updatedRecipe;
};

const excludeByID = async (id) => {
  const recipe = await existID(id);
  await recipesModel.excludeByID(id);
  return recipe;
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
  excludeByID,
};
