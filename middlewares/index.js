const validateEntriesMiddleware = require('./validateEntries');
const validateEmailMiddleware = require('./validateEmail');
const validateLoginMiddleware = require('./validateLogin');
const verifyTokenMiddleware = require('./verifyToken');
const validateEntriesRecipeMiddleware = require('./validateEntriesRecipe');

module.exports = {
  validateEntriesMiddleware,
  validateEmailMiddleware,
  validateLoginMiddleware,
  verifyTokenMiddleware,
  validateEntriesRecipeMiddleware,
};