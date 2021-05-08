const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const { recipeSchema } = require('../schemas');
const { recipeMiddleware, recipeIdMiddleware } = require('../middlewares');
const { validateToken } = require('../oauth');
const { recipeController } = require('../controllers');

const storage = multer.diskStorage({
  destination: (_request, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (request, file, callback) => {
    const { id } = request.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.use('/images', express.static(path.join(__dirname, '../uploads')));

const recipeId = '/recipes/:id';

router.post('/recipes', 
  recipeSchema, recipeMiddleware, validateToken, recipeController.createRecipe);
  
router.get('/recipes', recipeController.getAll);

router.get(recipeId, recipeIdMiddleware, recipeController.findRecipeById);

router.put(recipeId, validateToken, recipeController.updateRecipe);

router.delete(recipeId, validateToken, recipeController.deleteRecipe);

router.put(`${recipeId}/image`, 
  validateToken, upload.single('image'), recipeController.addImage);

module.exports = router;