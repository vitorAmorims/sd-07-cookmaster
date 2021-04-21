// const bcrypt = require('bcrypt-nodejs');
const Recipe = require('../models/recipeModel');
const code = require('../utils/code');
const msg = require('../utils/msg');

const createRecipe = async (name, ingredients, preparation, _id) => {  
  if (!name || !ingredients || !preparation) {
    return {
      status: code.BAD_REQUEST,
      msg: msg.invEntries,
    };
  }
  const newRecipe = await Recipe.create(name, ingredients, preparation, _id);
  return { status: code.CREATED, msg: newRecipe };
};

const getByIdService = async (id) => {
  const recipe = await Recipe.getById(id);
  if (!recipe) return { status: code.NOT_FOUND, msg: msg.noRecipe };
  return { status: code.OK, msg: recipe };
};

module.exports = {
  createRecipe,
  getByIdService,
};
