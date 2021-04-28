const usersMiddleware = require('./usersInputChecks');
const emailMiddleware = require('./emailChecks');
const authMiddleware = require('./authChecks');
const recipesMiddleware = require('./recipesInputChecks');

module.exports = {
  usersMiddleware,
  emailMiddleware,
  authMiddleware,
  recipesMiddleware,
};
