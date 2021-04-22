const jwt = require('jsonwebtoken');
const recipeModel = require('./recipeModel');
const userModel = require('../user/userModel');

const secret = 'manodoceumeajuda';

const createRecipe = async (name, ingredients, preparation, token) => {
  const decoded = jwt.verify(token, secret);
  const { _id: userId } = await userModel.getByEmail(decoded.email);
  const { 
    insertedId: _id,
  } = await recipeModel.createRecipe(name, ingredients, preparation, userId);

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id,
  };
};

module.exports = {
  createRecipe,
};
