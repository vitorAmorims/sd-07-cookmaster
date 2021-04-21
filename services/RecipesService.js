const jwt = require('jsonwebtoken');
const Recipe = require('../models/Recipes');
const secret = require('../utils/env');

const add = async (name, ingredients, preparation, auth) => {
  const { id } = jwt.decode(auth, secret);

  const newRecipe = await Recipe.add(name, ingredients, preparation, id);

  return newRecipe;
};

const updateWithImage = async (id, pathNameImage) => {
  await Recipe.updateWithImage(id, pathNameImage);

  const recipe = Recipe.getById(id);
  
  return recipe;
};

module.exports = {
  add,
  updateWithImage,
};