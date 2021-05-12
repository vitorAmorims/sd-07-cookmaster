const { Router } = require('express');
const { upload } = require('../Config/multer');
const {
  createRecipe,
  getAll,
  getById,
  updateById,
  excludeById,
  updateImg,
} = require('../Controllers/recipesController');
const {
  validateId,
  validateRecipe,
} = require('../Services/recipesService');
const { validateToken } = require('../Authentication/validateToken');
const { validateRecipesHash } = require('../Authentication/validateRecipesHash');

const recipesRouter = Router();

recipesRouter.post('/', validateToken, validateRecipe, createRecipe);

recipesRouter.get('/', getAll);
recipesRouter.get('/:id', validateId, getById);

recipesRouter.put('/:id', validateRecipesHash, updateById);
recipesRouter.delete('/:id', validateRecipesHash, excludeById);

recipesRouter.put(
  '/:id/image',
  validateToken,
  upload.single('image'),
  validateId,
  validateRecipesHash,
  updateImg,
);

module.exports = recipesRouter;
