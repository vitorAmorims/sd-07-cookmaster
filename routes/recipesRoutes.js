const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();
const recipeId = '/recipes/:id';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);    
    req.fileName = `${id}.jpeg`;
  },
});
const upload = multer({ storage });

router.post('/recipes', validateToken, recipesController.addRecipe);
router.get('/recipes', recipesController.getRecipes);
router.get(recipeId, recipesController.getRecipeById);
router.put(recipeId, validateToken, recipesController.updateRecipeById);
router.delete(recipeId, validateToken, recipesController.excludeRecipeById);
router.put(
  '/recipes/:id/image',
  validateToken,
  upload.single('image'),
  recipesController.uploadRecipeImage,
  );

module.exports = router;
