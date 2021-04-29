const { Router } = require('express');

const recipesRoutes = Router();

const RecipesController = require('../controllers/RecipesController');
const ValidateToken = require('../middlewares/validateToken');
const { upload } = require('./Multer');

recipesRoutes.post('/', ValidateToken, RecipesController.create);
recipesRoutes.get('/', RecipesController.getAllRecipes);
recipesRoutes.get('/:id', RecipesController.getRecipeById);
recipesRoutes.put('/:id', ValidateToken, RecipesController.update);
recipesRoutes.put('/:id/image/', 
[ValidateToken, upload.single('image')], 
RecipesController.uploadImage);
recipesRoutes.delete('/:id', ValidateToken, RecipesController.exclude);
module.exports = recipesRoutes;