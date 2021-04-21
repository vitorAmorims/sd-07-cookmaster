const recipesModel = require('../models/recipiesModel');
const recipesSchema = require('../schemas/recipeSchema');

const created = 201;
const OK = 200;

const add = async (name, ingredients, preparation) => {
  const validation = await recipesSchema.validateNameIngrPrep(name, ingredients, preparation);

  if (validation.message) return validation;

  const recipe = await recipesModel.add(name, ingredients, preparation);

  return { code: created, recipe };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  
  return { code: OK, recipes };
};

const getById = async (id) => {
  const validation = await recipesSchema.validateId(id);

  if (validation.message) return validation;

  const recipe = await recipesModel.getById(id);
  
  return { code: OK, recipe };
};

module.exports = {
  getAll,
  add,
  getById,
};
