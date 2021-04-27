const { insertUserServ } = require('./userServ');
const loginServ = require('./loginServ');
const { getOneRecipeServ, getRecipeServ, insertRecipeServ } = require('./recipeServ');
const servDictionary = require('./servDictionary');

module.exports = {
  getOneRecipeServ,
  getRecipeServ,
  insertRecipeServ,
  insertUserServ,
  loginServ,
  servDictionary,
};
