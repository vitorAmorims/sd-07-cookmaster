const {
  createNewUser,
} = require('./usersController');

const {
  login,
} = require('./loginController');

const {
  createNewRecipes,
} = require('./recipesController.js');

module.exports = {
  createNewUser,
  login,
  createNewRecipes,
};