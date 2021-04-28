const usersMiddleware = require('./usersInputChecks');
const emailMiddleware = require('./emailChecks');
const authMiddleware = require('./authChecks');
const recipesMiddleware = require('./recipesInputChecks');
const loginMiddleware = require('./loginChecks');
const recipeIdMiddleware = require('./recipeId');
const updateAuthMiddleware = require('./updateAuthChecks');

module.exports = {
  usersMiddleware,
  emailMiddleware,
  authMiddleware,
  recipesMiddleware,
  loginMiddleware,
  recipeIdMiddleware,
  updateAuthMiddleware,
};
