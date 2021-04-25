const errorMiddleware = require('./errorMiddleware');
const validateToken = require('./validateToken');
const recipesEntriesMiddleware = require('./recipesEntriesMiddleware');
const recipesIdMiddleware = require('./recipesIdMiddleware');
const loggedInMiddleware = require('./loggedInMiddleware');

module.exports = {
  errorMiddleware,
  recipesEntriesMiddleware,
  recipesIdMiddleware,
  validateToken,
  loggedInMiddleware,
};
