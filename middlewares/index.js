const errorMiddleware = require('./errorMiddleware');
const entriesValidate = require('./entriesValidate');
const loginValidate = require('./loginValidate');
const authValidate = require('./authValidate');
const recipesValidate = require('./recipesValidate');
const tokenValidate = require('./tokenValidate');
const idRecipeValidate = require('./idRecipeValidate');
const isSigned = require('./isSigned');

module.exports = {
  errorMiddleware,
  entriesValidate,
  isSigned,
  loginValidate,
  authValidate,
  recipesValidate,
  tokenValidate,
  idRecipeValidate,
};
