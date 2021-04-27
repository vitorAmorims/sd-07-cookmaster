const { recipesModel } = require('../models');

const {
  validEntries,
  existID,
  // validToken,
} = require('../validations/recipesValidation');

const add = async (name, ingredients, preparation) => {
  await validEntries(name, ingredients, preparation);
  // await validToken(email);

  const user = await recipesModel.add(name, ingredients, preparation);
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

const update = async (id, name, ingredients, preparation) => {
  await validEntries(name, ingredients, preparation);
  const updatedProduct = await recipesModel.updateByID(id, name, ingredients, preparation);
  return updatedProduct;
};

module.exports = {
  add,
  getAll,
  getByID,
  update,
};
