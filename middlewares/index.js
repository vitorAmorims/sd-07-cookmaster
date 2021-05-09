const errorMiddleware = require('./errorMiddleware');
const authMiddleware = require('./authMiddleware');
const userMiddleware = require('./userMiddleware');

module.exports = {
  errorMiddleware,
  authMiddleware,
  userMiddleware,
};
