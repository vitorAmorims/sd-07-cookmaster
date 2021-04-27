const {
  createNewUser,
} = require('./usersService');

const {
  login,
} = require('./loginService');

const {
  createNewRecipes,
} = require('./recipesService');

module.exports = {
  createNewUser,
  login,
  createNewRecipes,
};