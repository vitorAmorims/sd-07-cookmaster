const { createUserController, createAdminController } = require('./userController');
const loginController = require('./loginController');
const recipesController = require('./recipesController');

module.exports = {
  createUserController,
  createAdminController,
  loginController,
  recipesController,
};