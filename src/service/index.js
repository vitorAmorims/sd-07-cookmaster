const { insertUserServ } = require('./userServ');
const loginServ = require('./loginServ');
const {
  delRecipeServ,
  editRecipeServ,
  insertRecipeServ,
  getOneRecipeServ,
  getRecipeServ,
} = require('./recipeServ');
const servDictionary = require('./servDictionary');

module.exports = {
  delRecipeServ,
  editRecipeServ,
  getOneRecipeServ,
  getRecipeServ,
  insertRecipeServ,
  insertUserServ,
  loginServ,
  servDictionary,
};
