const errorMiddleware = require('./errorMiddleware');
const createUserMidd = require('./createUser');
const loginMidd = require('./login');
const checkEntries = require('./checkEntries');
const checkRecipeId = require('./checkRecipeId');
const checkOwnership = require('./checkOwnership');
const checkAdminPrivilege = require('./checkAdminPrivilege');

module.exports = {
  errorMiddleware,
  createUserMidd,
  loginMidd,
  checkEntries,
  checkRecipeId,
  checkOwnership,
  checkAdminPrivilege,
};
