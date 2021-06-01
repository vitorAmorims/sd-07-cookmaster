const { Router } = require('express');
const multer = require('multer');
const recipeService = require('../services/recipesService');

const {
  addValidations,
  validatingId,
  updateValidation,
  removeValidation } = require('../middlewares/recipeMiddleware');

const routes = Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, 'uploads'),
  filename: (request, file, callback) => callback(null, `${request.params.id}.jpeg`),
});

const upload = multer({ storage });

routes.post('/', addValidations, recipeService.addRecipe);
routes.get('/', recipeService.getAll);
routes.get('/:id', validatingId, recipeService.getById);
routes.put('/:id', updateValidation, recipeService.updateById);
routes.put('/:id/image', updateValidation, upload.single('image'), recipeService.uploadImage);
routes.delete('/:id', removeValidation, recipeService.removeById);

module.exports = routes;