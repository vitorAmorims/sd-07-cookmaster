const { insertUserServ } = require('./userServ');
const loginServ = require('./loginServ');
const { getRecipeServ, insertRecipeServ } = require('./recipeServ');
const servDictionary = require('./servDictionary');

module.exports = {
  getRecipeServ,
  insertRecipeServ,
  insertUserServ,
  loginServ,
  servDictionary,
};
