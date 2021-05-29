const recipesModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const isLogged = async (req, res, next) => {
  const { id } = req.params;
  const { email, role } = req.user;
  const recipe = await recipesModel.getRecipeById(id);
  const { userId } = recipe;
  if (!recipe) {
    res.status(401).json({ message: 'recipe not found' });
  }
  const loggedTrue = await userModel.findEmail(email);

  const { _id: logindId } = loggedTrue;
  if (logindId.toString() === userId.toString() || role === 'admin') {
    return next();
  }

  return res.status(404).json({ message: 'missing auth token' });
};

module.exports = isLogged;
