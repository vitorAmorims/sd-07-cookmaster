const {
  createNewUser,
} = require('./usersService');

const {
  login,
} = require('./loginService');

const {
  createNewRecipes,
  getAllRecipes,
} = require('./recipesService');

module.exports = {
  createNewUser,
  login,
  createNewRecipes,
  getAllRecipes,
};