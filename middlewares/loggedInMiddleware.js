const usersModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');

const loggedOffMessage = { message: 'missing auth token' };
const invalidId = { message: 'recipe not found' };

const loggedInMiddleware = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.user);
  const { email, role } = req.user;
  const recipe = await recipesModel.getRecipeById(id);
  console.log(recipe);
  const { userId } = recipe;
  if (recipe === null) {
      return res.status(401).json(invalidId);
  }
  const loggedInUser = await usersModel.findEmail(email);
  console.log(loggedInUser);

  const { _id: loginId } = loggedInUser;
  if (loginId.toString() === userId.toString() || role === 'admin') {
  return next();
  }
  
  return res.status(404).json(loggedOffMessage);
};

module.exports = loggedInMiddleware;
