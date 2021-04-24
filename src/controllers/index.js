const { users } = require('./usersController');
const { login } = require('./loginController');
const { recipes } = require('./recipesController');

console.log(recipes);
module.exports = {
  users,
  login,
  recipes,
};
