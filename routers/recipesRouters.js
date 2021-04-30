const express = require('express');
const {
  createRecipe,
  getAll,
  getById,
  updateById,
  deleteById,
  addImg,
} = require('../controller/recipesController');
const {
  validateToken,
  validateRecipeFields,
  validateIdParams,
} = require('../middlewares/validates');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();
router.use(express.static(`${__dirname}/images`));

const recipesId = '/recipes/:id';

router.post('/recipes', [validateToken, validateRecipeFields], createRecipe);
router.get('/recipes', getAll);
router.get(recipesId, validateIdParams, getById);
router.put(recipesId, [validateToken, validateIdParams], updateById);
router.delete(recipesId, [validateToken, validateIdParams], deleteById);
router.post('/recipes/:id/image/', [validateToken, validateIdParams, uploadMiddleware], addImg);

module.exports = router;
