const validateEntriesMiddleware = require('./validateEntries');
const validateEmailMiddleware = require('./validateEmail');
const validateLoginMiddleware = require('./validateLogin');

module.exports = {
  validateEntriesMiddleware,
  validateEmailMiddleware,
  validateLoginMiddleware,
};