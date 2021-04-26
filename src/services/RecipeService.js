const jwt = require('jsonwebtoken');
const RecipeModel = require('../models/RecipeModel');

const SECRET_PASS = 'marcelodossantos';

const create = async (name, ingredients, preparation, authorization) => {
  const { _id: userId } = jwt.verify(authorization, SECRET_PASS);
  
  const recipe = await RecipeModel.create(name, ingredients, preparation, userId);
  
  return { recipe: { _id: recipe.insertedId, name, ingredients, preparation, userId } };
};

const findAll = async () => {
  const recipes = await RecipeModel.findAll();

  return recipes;
};

const findById = async (id) => {
  const recipe = await RecipeModel.findById(id);

  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  await RecipeModel.update(id, name, ingredients, preparation);
  
  const recipe = await RecipeModel.findById(id);

  return recipe;
};

const createImage = async (id, image) => {
  await RecipeModel.createImage(id, image);
  
  const recipe = await RecipeModel.findById(id);

  return recipe;
};

const exclude = async (id) => {
  await RecipeModel.exclude(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
  createImage,
};
