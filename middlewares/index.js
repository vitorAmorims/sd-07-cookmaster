const errorMiddleware = require('./errorMiddleware');
const logMiddleware = require('./logMiddleware');
const validateTokenMiddleware = require('./validateTokenMiddleware');

module.exports = {
  errorMiddleware,
  logMiddleware,
  validateTokenMiddleware,
};
