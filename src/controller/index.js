const insertUserCtrl = require('./usersControllers');
const { getRecipeCtrl, insertRecipeCtrl } = require('./recipeController');
const loginCtrl = require('./loginCtrl');

module.exports = {
  getRecipeCtrl,
  insertRecipeCtrl,
  insertUserCtrl,
  loginCtrl,
};
