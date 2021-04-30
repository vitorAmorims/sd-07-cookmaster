const recipesRoute = require('./recipesRoutes');
const recipesController = require('./recipesController');
const recipesService = require('./recipesService');
const recipesModel = require('./recipesModel');

module.exports = {
  recipesController,
  recipesRoute,
  recipesService,
  recipesModel,
};