const errorMiddleware = require('./errorMiddleware');
const authMiddleware = require('./authMiddleware');
const userMiddleware = require('./userMiddleware');
const loginMiddleware = require('./loginMiddleware');

module.exports = {
  errorMiddleware,
  authMiddleware,
  loginMiddleware,
  userMiddleware,
};
