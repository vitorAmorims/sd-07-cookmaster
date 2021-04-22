const recipesModel = require('../models/recipiesModel');
const recipesSchema = require('../schemas/recipeSchema');

const created = 201;
const OK = 200;
const noContent = 204;

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

const update = async (id, name, ingredients, preparation) => {
  const validation = await recipesSchema.validateNameIngrPrep(name, ingredients, preparation);

  if (validation.message) return validation;

  await recipesModel.update(id, name, ingredients, preparation);

  const recipe = {
    _id: id,
    name,
    ingredients,
    preparation,
  };

  return { code: OK, recipe };
};

const exclude = async (id) => {
  const validation = await recipesSchema.validateNameIngrPrep(id);

  if (validation.err) return validation;

  const recipe = await recipesModel.exclude(id);

  return { code: noContent, recipe };
};

module.exports = {
  getAll,
  add,
  getById,
  update,
  exclude,
};
