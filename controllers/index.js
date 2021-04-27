const {
  createNewUser,
} = require('./usersController');

const {
  login,
} = require('./loginController');

const {
  createNewRecipes,
  getAllRecipes,
} = require('./recipesController.js');

module.exports = {
  createNewUser,
  login,
  createNewRecipes,
  getAllRecipes,
};