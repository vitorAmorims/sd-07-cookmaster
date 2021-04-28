const { insertUserServ } = require('./userServ');
const loginServ = require('./loginServ');
const {
  editRecipeServ,
  insertRecipeServ,
  getOneRecipeServ,
  getRecipeServ,
} = require('./recipeServ');
const servDictionary = require('./servDictionary');

module.exports = {
  editRecipeServ,
  getOneRecipeServ,
  getRecipeServ,
  insertRecipeServ,
  insertUserServ,
  loginServ,
  servDictionary,
};
