const {
  createNewUser,
  getByEmailAndPassword,
} = require('./usersModel');

const {
  createNewRecipes,
  getAllRecipes,
} = require('./recipesModel');

module.exports = {
  createNewUser,
  getByEmailAndPassword,
  createNewRecipes,
  getAllRecipes,
};