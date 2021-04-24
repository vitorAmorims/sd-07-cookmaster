const { insertUserServ } = require('./userServ');
const loginServ = require('./loginServ');
const insertRecipeServ = require('./recipeServ/insertRecipeServ');
const servDictionary = require('./servDictionary');

module.exports = {
  insertRecipeServ,
  insertUserServ,
  loginServ,
  servDictionary,
};
